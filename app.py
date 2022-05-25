from flask import Flask, render_template, request
from camera import url_to_image, emoDetect

app = Flask(__name__)

# Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Receiving capture image from client to process
@app.route('/postimage', methods=['POST'])
def post_img_url():
    jsdata = request.form['javascript_data']
    img = url_to_image(jsdata)
    global emotion
    emotion = emoDetect(img)
    return jsdata

# Send predicted emotion to web client
@app.route('/getemotion')
def get_emotion():
    return emotion

# Checking if this file is run from another file or not
if(__name__ == '__main__'):
    app.run(debug=True)
