status="";
objects=[];
function preload(){
 
}
function setup(){
canvas = createCanvas(480,380);
video= createCapture(480,380);
video.hide();
canvas.center();
}

function draw(){
    image(video,0,0,480,380);

    if(status != ""){
        object_detector.detect(video,gotResults);

        for (i = 0; i< objects.length; i++) {
            
            percent= floor(objects[i].confidence*100);
            label=objects[i].label;
            fill("blue");
            text(objects[i].label+ " "+percent+"%", objects[i].x+15,objects[i].y+15);
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            
        }
        if(objects[i].label == object_name){
            video_webcamLiveView.stop()
            object_detector.detect(gotResults);
            document.getElementById("object_found").innerHTML= object_name+" found";
            var synth = window.speechSynthesis;
              speak_data = objects[i].label;
              var utterthis= new SpeechSynthesisUtterance(speak_data);
              synth.speak(utterthis);
        }

}
}
function start(){
    object_detector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting objects";
    object_name= document.getElementById("input").value;
   
}
function modelLoaded(){
    status= true;
    console.log("Model Loaded");
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    
    console.log(results);
    objects= results;
    
    }