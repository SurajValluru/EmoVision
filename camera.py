from deepface import DeepFace
import cv2
import numpy as np
import urllib.request

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
    faces_detected = face_haar_cascade.detectMultiScale(img)
    predicted_emotion = ''
    if len(faces_detected) == 1:
        predictions = DeepFace.analyze(
            img, ('emotion',), enforce_detection=False)
        predicted_emotion = predictions['dominant_emotion']
    elif len(faces_detected) == 0:
        predicted_emotion = 'no'
    else:
        predicted_emotion = 'multi'
    return predicted_emotion
