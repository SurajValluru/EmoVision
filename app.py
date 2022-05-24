from flask import Flask, render_template, request
from camera import url_to_image, emoDetect

app = Flask(__name__)

emotion = 'loading'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/postimage', methods=['POST'])
def post_img_url():
    jsdata = request.form['javascript_data']
    img = url_to_image(jsdata)
    global emotion
    emotion = emoDetect(img)
    return jsdata


@app.route('/postclose', methods=['POST'])
def post_close():
    jsdata = request.form['javascript_data']
    global emotion
    emotion = 'loading'
    return jsdata


@app.route('/getemotion')
def get_emotion():
    return emotion


if(__name__ == '__main__'):
    app.run(debug=True)
