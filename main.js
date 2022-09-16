var stats = false;
var webcamswitch = true;
function setup() {
    canvas = createCanvas(460,460);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
if (webcamswitch) {
    background(255);
image(video,0,0,460,460);
if (stats) {
objectDetector.detect(video,gotResult);
}
}else {
    background(255);
    image(video,0,0,460,460);
fill("white");
stroke("white");
text("The object you were looking for was found.",mouseX,mouseY);
}
}
function modelLoaded() {
    console.log("cocossd is loaded");
    stats = true;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function gotResult(error,results) {
    if (error) {
        console.log("Error");
    }else {
        console.log(results);
        for (i = 0; i < results.length; i++) {
            stroke("white");
            noFill();
            rect(results[i].x,results[i].y,results[i].width,results[i].height);
          
            if (document.getElementById("ObjectName").value == results[i].label) {
                webcamswitch = false;
            }
        }
    }
}
function start() {
    webcamswitch = true;
    document.getElementById("status").innerHTML = "Status : Loading Nueral Network...";
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
 
}