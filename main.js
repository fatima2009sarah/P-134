img = "";
status = "";
objects = [];
objectDetector = "";
baby_found = "";
song = "";

function preload() {
    song = loadSound('iphone_13_original.mp3');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status is detecting the object";

}

function modelLoaded() {
    console.log("model is Loaded");

    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (var i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status - object detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            baby_found = objects[i].label;
        }
        if(baby_found != "baby"){
        song.play();
        }
        else{
            document.getElementById("baby").innerHTML = "Baby found";
        }
    }


}