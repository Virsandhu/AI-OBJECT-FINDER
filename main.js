status="";
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