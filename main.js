Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");
prediction_1="";
prediction_2="";

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="abc" src="'+data_uri+'"/>'
    })
}
console.log('ml5version=',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1viNBp5JL/',modelloaded);
function modelloaded()
{
    console.log("modelloaded")
}
function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is"+prediction_1;
    speak_data_2="the second prediction is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check()
{
    img=document.getElementById("abc");
    classifier.classify(img,gotresult)
}
function gotresult(error,result)
{
if(error){
console.error(error);    
}
else{
    document.getElementById("result_emotion_name").innerHTML=result[0].label;
    document.getElementById("result_emotion_name2").innerHTML=result[1].label;
    prediction_1=result[0].label;
    prediction_2=result[1].label;
    speak();
    if(result[0].label=="happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;"
    }
    if(result[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"
    }
    if(result[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;"
    }

if(result[1].label=="happy"){
    document.getElementById("update_emoji2").innerHTML="&#128522;"
}
if(result[1].label=="sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532;"
}
if(result[1].label=="angry"){
    document.getElementById("update_emoji2").innerHTML="&#128548;"
}
}
}