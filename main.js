status="";
objects=[];
function preload(){
 
}
function setup(){
canvas = createCanvas(380,380);
video= createCapture(VIDEO);
video.size(380,380)
video.hide();
canvas.center();
}

function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        object_detector.detect(video,gotResults);

        for (i = 0; i< objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: Objects detected";
            percent= floor(objects[i].confidence*100);
           
            fill("blue");
            text(objects[i].label+ " "+percent+"%", objects[i].x+15,objects[i].y+15);
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == object_name){
                video.stop()
                object_detector.detect(gotResults);
                document.getElementById("object_found").innerHTML= object_name+" found";
                var synth = window.speechSynthesis;
                  speak_data = object_name+"found";
                  var utterthis= new SpeechSynthesisUtterance(speak_data);
                  synth.speak(utterthis);
            }else{
                document.getElementById("object_found").innerHTML= object_name+" not found";
            }
            
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