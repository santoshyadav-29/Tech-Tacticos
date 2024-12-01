from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import cv2
from ultralytics import YOLO
import asyncio
import threading

app = FastAPI()
model = YOLO('yolo11l.pt')

# Add CORSMiddleware to handle CORS
origins = [
    "http://localhost",  # Allow localhost
    "http://localhost:3000",  # If you're using React/Vue/Angular on port 3000
    "http://localhost:5173",  # Add your frontend's domain here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specific origins (can be a list of domains)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# To keep track of background tasks
tasks = []

class ObjectGuidance:
    @staticmethod
    def determine_guidance(obj_x, obj_y, hand_x, hand_y):
        x_diff = abs(obj_x - hand_x)
        y_diff = abs(obj_y - hand_y)

        if x_diff > y_diff:
            return "Move Right" if obj_x > hand_x else "Move Left"
        elif x_diff < 2 and y_diff < 2:
            return "You are close"
        else:
            return "Move Down" if obj_y > hand_y else "Move Up"

# Shared variable with a lock
last_direction = "a moment"
last_direction_lock = asyncio.Lock()

def process_video_feed():
    global last_direction
    cap = cv2.VideoCapture(0)
    # cap = cv2.VideoCapture('http://172.17.16.146:4747/video')
    # cap = cv2.VideoCapture('http://192.168.84.56:4747/video')

    if not cap.isOpened():
        print("Error: Webcam not detected!")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        annotated_frame = frame.copy()

        object_coords = None
        hand_coords = None
        guidance_direction = None

        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls = int(box.cls)
                class_name = model.names[cls].lower()

                xyxy = box.xyxy[0]
                x1, y1, x2, y2 = map(int, xyxy)
                center_x = (x1 + x2) // 2
                center_y = (y1 + y2) // 2

                if class_name == 'person':
                    hand_coords = (center_x, center_y)
                elif class_name == 'scissors':
                    object_coords = (center_x, center_y)

                color = (0, 255, 0)
                cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), color, 2)

        if object_coords and hand_coords:
            guidance_direction = ObjectGuidance.determine_guidance(
                object_coords[0], object_coords[1],
                hand_coords[0], hand_coords[1]
            )

        for result in results:
            boxes = result.boxes
            for box in boxes:
                cls = int(box.cls)
                class_name = model.names[cls].lower()

                if class_name == 'person':
                    # Extract coordinates
                    xyxy = box.xyxy[0]
                    x1, y1, x2, y2 = map(int, xyxy)
                    center_x = (x1 + x2) // 2
                    center_y = (y1 + y2) // 2

                    # New label with guidance direction
                    conf = box.conf.item()
                    label = f'person {conf:.2f} ({center_x}, {center_y}) {guidance_direction}'

                    # Put updated text label
                    cv2.putText(annotated_frame, label,
                    (x1 + 5, y1 + 20),  # Position the text slightly inside the top-left corner of the bounding box
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,  # Smaller font scale for reduced text size
                    (0, 255, 0),  # Text color
                    1)  # Thinner text thickness

            # Lock access to last_direction to ensure thread-safety
        if guidance_direction:
            asyncio.run(update_direction(guidance_direction))

        # Display the annotated frame with bounding boxes and guidance
        cv2.imshow('YOLOv8 Webcam Feed', annotated_frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("Webcam processing complete.")

# Helper function to update last_direction with a lock
async def update_direction(guidance_direction: str):
    async with last_direction_lock:
        global last_direction
        last_direction = guidance_direction
    print(f"Guidance Direction: {last_direction}")

@app.get("/start")
async def start_processing(background_tasks: BackgroundTasks):
    # Add the task to run in the background
    task = background_tasks.add_task(run_in_background)
    tasks.append(task)
    return {"message": "started"}

def run_in_background():
    process_video_feed()

@app.get("/direction")
async def return_direction():
    # Lock access to last_direction to ensure thread-safety
    async with last_direction_lock:
        return {"message": last_direction}

@app.get("/stop")
async def stop_processing():
    # Stop all background tasks (this needs more management in a real-world scenario)
    for task in tasks:
        task.cancel()  # This will cancel all tasks
    return {"message": "All background tasks stopped."}
