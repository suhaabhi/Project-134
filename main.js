status = "";
objects = [];
sound = "";

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
}

function preload()
{
    sound = loadSound("alarm.mp3");
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 300, 300);

    if (status !=" ") 
{
    objectDetector.detect(img, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Baby Detected";
             
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            fill("red");
            percent = floor(objects[i].confidence * 100);
            noFill();
            stroke("red");
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);

            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Status : Baby Detected";
                console.log("stop");
                sound.stop();
            }
            else
            {
                document.getElementById("status").innerHTML = "Status : Baby Not Detected";
                console.log("play");
                sound.play();
            }
        }
    
} 

if(objects.length == 0)
{
    document.getElementById("status").innerHTML = "Status : Baby Not Detected";
    console.log("play");
    sound.play();
}
}   