from flask import Flask, render_template, request
from camera import url_to_image, emoDetect

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/postmethod', methods=['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    img = url_to_image(jsdata)
    emoDetect(img)
    return jsdata


@app.route('/postmethodclose', methods=['POST'])
def get_post_close():
    jsdata = request.form['javascript_data']
    with open('static/emotion.txt', 'w+') as emo:
        emo.writelines(jsdata)
    return jsdata


if(__name__ == '__main__'):
    app.run(debug=True)
