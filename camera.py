from deepface import DeepFace
import cv2
import numpy as np
import urllib.request


def url_to_image(url: str):
    """Returns opencv format image.

    Converts image url to opencv image."""
    # download the image, convert it to a NumPy array,
    # and then read it into OpenCV format
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # return the image
    return image


# Markup to detect face locations
face_haar_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


def emoDetect(img) -> str:
    """
    Returns predicted emotion of image."""
    # Detect faces
    faces_detected = face_haar_cascade.detectMultiScale(img)
    if len(faces_detected) == 1:
        # Predict Emotion
        predictions = DeepFace.analyze(
            img, ('emotion',), enforce_detection=False)
        return predictions['dominant_emotion']
    elif len(faces_detected) == 0:
        return 'no'
    else:
        return 'multi'


# Hard-coded driver function to run the program
def main():
    # Create camera object
    capture = cv2.VideoCapture(0)
    while True:
        success, img = capture.read()
        if success:
            # Predicted emotion is put on image
            cv2.putText(img, emoDetect(img), (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            cv2.imshow('Live Feed', img)
            key = cv2.waitKey(1)
            # To press 'esc' key to close feed
            if key == 27:
                break
        else:
            # If camera can't be accessed
            print('Please check your Cam...')
            break
    capture.release()
    cv2.destroyAllWindows()


# Executes the main function
if __name__ == '__main__':
    main()
