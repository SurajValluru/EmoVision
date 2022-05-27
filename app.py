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

# Tutorial Page
@app.route('/howto')
def howTo():
    return render_template('howto.html')

# Custom Config Page
@app.route('/config')
def config():
    return render_template('config.html')

# About Us Page
@app.route('/aboutme')
def aboutMe():
    return render_template('aboutme.html')

# Checking if this file is run from another file or not
if(__name__ == '__main__'):
    app.run(debug=True)
