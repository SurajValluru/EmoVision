from gtts import gTTS

txt = "fear"
txtObj = gTTS(txt)
txtObj.save(txt+'.mp3')