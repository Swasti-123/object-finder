cocoStatus="";
objects=[];

function setup(){
    var canvas =  createCanvas(480,380);
    canvas.center();
    synth = window.speechSynthesis;
}

function preload(){
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide(); 
  }
    
  function start(){
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
    input= document.getElementById("object").value;
  }

  
function modelLoaded(){
    console.log("the model has loaded");
    cocoStatus= true;     
}

function draw(){
    image(video,0,0, 480,380);
 if(cocoStatus != ""){
  objectDetector.detect(video, gotResults)

    for(i=0; i<objects.length; i++){
        stroke("black");
        fill("black");
        text(objects[i].label +"  " + Math.floor(objects[i].confidence * 100) + "%", objects[i].x  , objects[i].y -10);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label == input){
          video.stop();
          objectDetector.detect(gotResults);
          document.getElementById("status").innerHTML= "Object Detected";
          var synth= window.speechSynthesis;
          utterThis= new SpeechSynthesisUtterance("object mentioned found");
          synth.speak(utterThis);
        }            
    }
 }
 else{
  document.getElementById("status").innerHTML= "Object Not Detected";
          var synth= window.speechSynthesis;
          utterThis= new SpeechSynthesisUtterance("object mentioned not found");
          synth.speak(utterThis);
 }
}


function gotResults(error, results){
  if(error){
      console.error(error);
  }
  console.log(results);
  objects=results;
 }

 
