from gtts import gTTS

txt = "Happy"
txtObj = gTTS(txt)
txtObj.save('happy.mp3')