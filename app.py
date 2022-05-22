from flask import Flask, render_template, Response
from camera import Video

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',current_emotion = predicted_emotion)

predicted_emotion = 'loading'

@app.route('/emotion')
def emotion():
    # return Response(cur_emotion(),mimetype='text/x-mixed-replace; boundary=emotion')
    return predicted_emotion

def gen(camera):
    while True:
        frame=camera.get_frame()
        global predicted_emotion 
        predicted_emotion = frame[1]
        
        yield(b'--frame\r\n'
        b'Content-Type:  image/jpeg\r\n\r\n' + frame[0] +
        b'\r\n\r\n')

@app.route('/video')
def video():
    return Response(gen(Video()),
    mimetype='multipart/x-mixed-replace; boundary=frame')

if(__name__ == '__main__'):
    app.run(debug=True)