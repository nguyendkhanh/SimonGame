var colors=["red","green","blue","yellow"];
var gamePattern=[];
var userClicked=[];
var started=false;
var level=0;

$(document).keydown(function(){
  if(!started){
    $(".level-title").text("Level "+level );
    next();
    started=true;
  }
});

function next(){
  userClicked=[];
  level++;
  $(".level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor=colors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function check(currentLevel){
  if(gamePattern[currentLevel]===userClicked[currentLevel]){
    if(gamePattern.length===userClicked.length){
      setTimeout(function(){
        next();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over,press a key to restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },300);
    restart();
  }
}

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClicked.push(userChosenColor);
  playSound(userChosenColor);
  animationPressed(userChosenColor);

  check(userClicked.length-1);
});

function playSound(name){
  var audio =new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animationPressed(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function restart(){
  level=0;
  gamePattern=[];
  started=false;
}
