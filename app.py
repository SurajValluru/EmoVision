from flask import Flask, render_template, request
from camera import url_to_image, emoDetect

app = Flask(__name__)


@app.route('/') # Home Page
def index():
    return render_template('index.html')


@app.route('/postimage', methods=['POST']) # Receiving capture image
def post_img_url():
    jsdata = request.form['javascript_data']
    img = url_to_image(jsdata)
    global emotion
    emotion = emoDetect(img)
    return jsdata


@app.route('/getemotion') # Send predicted emotion to client
def get_emotion():
    return emotion


@app.route('/desktop') # For desktop
def desktop():
    return render_template('desktop.html')


@app.route('/howto') # Tutorial Page
def howTo():
    return render_template('howto.html')


@app.route('/config') # Custom Config Page
def config():
    return render_template('config.html')


@app.route('/aboutme') # About Us Page
def aboutMe():
    return render_template('aboutme.html')


if(__name__ == '__main__'): # Checking if file is run at __main__
    app.run(debug=True)
