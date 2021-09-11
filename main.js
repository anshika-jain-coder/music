song1=""
song2=""
leftwristy=0;
leftwristx=0;
rightwristy=0;
rightwristx=0;
song1_status = "";
song2_status = "";
scoreRightWrist=0;
scoreLeftWrist=0;
function preload(){
song1=loadSound("1st.mp3");
song2=loadSound("3rd.mp3")
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('Posenet is intialized');
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist" + scoreLeftWrist);

		rightwristx = results[0].pose.rightWrist.x;
		rightwristy = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightwristx + " rightWristY = " + rightwristy);

		leftwristx = results[0].pose.leftWrist.x;
		leftwristy = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftwristx + " leftWristY = "+ leftwristy);
    }
}
function draw(){
    image(video,0,0,600,500);
   
    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();


   fill("#FF0000");
   stroke("#FF0000");

   if(scoreRightWrist > 0.2)
   {
	   circle(rightwristx,rightwristy, 20);

	   song2.stop();

	   if (song1_status == false)
	   {
		   song1.play();
		   document.getElementById("song").innerHTML = "Filhall";
	   }
   }

   if(scoreLeftWrist > 0.2)
   {
	   circle(leftwristx,leftwristy, 20);

	   		song1.stop();

		if (song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "yaad piya ki aane lagi";
		}
   }
}



function play(){
    song.play();
    song.setVolume(1);
	song.rate(1);
}
function stopSongs()
{
	song1.stop();
	song2.stop();
	document.getElementById("song").innerHTML = "Song Name";
}
