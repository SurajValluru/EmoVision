from deepface import DeepFace
import cv2


def boxFace(frame, x, y, x1, y1, color=(255, 0, 255)):
    cv2.rectangle(frame, (x, y), (x1, y1), color, 1)
    cv2.line(frame, (x, y), (x+30, y), color, 6)  # Top Left
    cv2.line(frame, (x, y), (x, y+30), color, 6)

    cv2.line(frame, (x1, y), (x1-30, y), color, 6)  # Top Right
    cv2.line(frame, (x1, y), (x1, y+30), color, 6)

    cv2.line(frame, (x, y1), (x+30, y1), color, 6)  # Bottom Left
    cv2.line(frame, (x, y1), (x, y1-30), color, 6)

    cv2.line(frame, (x1, y1), (x1-30, y1), color, 6)  # Bottom Right
    cv2.line(frame, (x1, y1), (x1, y1-30), color, 6)


face_haar_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)

while True:
    # captures frame and returns boolean value and captured image
    ret, img = cap.read()
    if not ret:
        continue
    faces_detected = face_haar_cascade.detectMultiScale(img, 1.32, 5)
    for (x, y, w, h) in faces_detected:
        boxFace(img, x, y, x+w, y+h)
        predictions = DeepFace.analyze(
            img, ('emotion',), enforce_detection=False)
        predicted_emotion = predictions['dominant_emotion']
        print(predicted_emotion)
        cv2.putText(img, predicted_emotion, (int(x), int(y)),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        cv2.imshow('Facial emotion analysis ', img)
        key = cv2.waitKey(20)
        if key == 27:
            break

cap.release()
cv2.destroyAllWindows
