from deepface import DeepFace
import cv2
import numpy as np
import urllib.request


def boxFace(frame, x, y, x1, y1, color=(255, 0, 255)):  # Draw a box around the face
    cv2.rectangle(frame, (x, y), (x1, y1), color, 1)
    cv2.line(frame, (x, y), (x+30, y), color, 6)  # Top Left
    cv2.line(frame, (x, y), (x, y+30), color, 6)

    cv2.line(frame, (x1, y), (x1-30, y), color, 6)  # Top Right
    cv2.line(frame, (x1, y), (x1, y+30), color, 6)

    cv2.line(frame, (x, y1), (x+30, y1), color, 6)  # Bottom Left
    cv2.line(frame, (x, y1), (x, y1-30), color, 6)

    cv2.line(frame, (x1, y1), (x1-30, y1), color, 6)  # Bottom Right
    cv2.line(frame, (x1, y1), (x1, y1-30), color, 6)
# import the necessary packages
# METHOD #1: OpenCV, NumPy, and urllib


def url_to_image(url):
    # download the image, convert it to a NumPy array, and then read
    # it into OpenCV format
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # return the image
    return image


# Markup to detect face locations
face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +
                                          'haarcascade_frontalface_default.xml')


def emoDetect(img):
    img = cv2.flip(img, 1)
    faces_detected = face_haar_cascade.detectMultiScale(img, 1.1, 10)
    predicted_emotion = ''
    if len(faces_detected) == 1:
        x, y, w, h = faces_detected[0]
        boxFace(img, x, y, x+w, y+h)
        predictions = DeepFace.analyze(
            img, ('emotion',), enforce_detection=False)
        predicted_emotion = predictions['dominant_emotion']
        cv2.putText(img, predicted_emotion, (int(x), int(y)),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    elif len(faces_detected) == 0:
        img = cv2.imread('static/images/No Face.jpg')
        predicted_emotion = 'no'
    else:
        img = cv2.imread('static/images/Multi.jpg')
        predicted_emotion = 'multi'
    with open('static/emotion.txt', 'w+') as emo:
        emo.writelines(predicted_emotion)
