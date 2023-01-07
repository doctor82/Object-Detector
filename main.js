video = "";
status="";
objects=[];
function setup() {
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
    canvas = createCanvas(480, 380);
    canvas.center();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    objects_name=document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("Model has been loaded");
    status = true;
}

function gotResults(error,results){
if(error){
console.error(error);
}
console.log(results);
objects=results;

}
function draw() {
    image(video, 0, 0, 480, 380);
    if(status!=""){
    objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: Object Detected";
    fill("red");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    stroke("red");
    noFill();
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label==objects_name){
    video.stop();
    objectDetector.detect(gotResults);
    document.getElementById("object_status").innerHTML=objects_name+" Found";
    synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(object_name+" Found");
    synth.speak(utterThis);
    }
    else{
    document.getElementById("object_status").innerHTML=objects_name+" not found";
    }
    }
    }
}