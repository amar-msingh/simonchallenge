
var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).on("keydown",function(){
if(!started)
{
  $("#level-title").text(" Level "+level);
started=true;
nextSequence();
}
});

$(".btn").on("click",function(){
  var userChoosenColour=$(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
  console.log("success");
  if(userClickedPattern.length===gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);
}
}
else
  {
  playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
  }
}

function nextSequence()
{
  userClickedPattern=[];
  level++;
    $("#level-title").text(" Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);
  animatePress(randomChoosenColour);

}

function playSound(name)
{
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function startover()
{
  level=0;
  gamePattern=[];
  started=false;
}
