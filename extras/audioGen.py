from gtts import gTTS

txt = "Please Wait"
txtObj = gTTS(txt)
txtObj.save('loading'+'.mp3')