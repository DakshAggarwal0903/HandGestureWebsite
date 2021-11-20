
prediction1="";
prediction2="";
camera=document.getElementById("camera");
Webcam.attach('#camera');
Webcam.set({
width:350,
height:350,
image_format:'jpg',
jpg_quality:100
});
function takeimg(){
    Webcam.snap(
    function(snapshot){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+snapshot+'"/>';
    }
    );
}
console.log("ML5 loaded",ml5.version);
x=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ft1bD4-ss/model.json',modelloaded);
function modelloaded(){
    console.log("Model is loaded");
}
function takeres(){
    capImg=document.getElementById("captured_image");
    x.classify(capImg,getRes);
}
function getRes(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("emo").innerHTML=result[0].label;
        document.getElementById("result_emotion_name").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(result[0].label=="Victory"){
            document.getElementById("emoj").innerHTML= "&#9996";
        }
        if(result[0].label=="Amazing"){
            document.getElementById("emoj").innerHTML= "&#128076";
        }
        if(result[0].label=="Great"){
            document.getElementById("emoj").innerHTML="&#129304";
        }
      
        
        if(result[1].label=="Victory"){
            document.getElementById("result_emotion_name2").innerHTML= "&#9996";
        }
        if(result[1].label=="Amazing"){
            document.getElementById("result_emotion_name2").innerHTML= "&#128076";
        }
        if(result[1].label=="Great"){
            document.getElementById("result_emotion_name2").innerHTML="&#129304";
        }
}
}
function speak(){
     synth = window.speechSynthesis;
    a="The first prediction is"+prediction1;
    b="The second prediction is"+prediction2;
     utterThis = new SpeechSynthesisUtterance(a+b);
    synth.speak(utterThis);
}