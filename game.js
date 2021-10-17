var gamePattern=[];

var buttonColors=[];
buttonColors=["red","blue","green","yellow"];

var userClickedPattern=[];

var level=0;

var started=false;

//one time during pressing a key
$(document).keypress(function()
{
    if(!started){
        $("#level-title").text("Level : "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    //storing clicked button in an array
    userClickedPattern.push(userChosenColour);

    //playing sound when a button gets clicked
    playsound(userChosenColour);

    //creating animation when a button gets clicked
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    }
    else{
    console.log("wrong");
    wrong();
    }
}


//generating random colour and animate it by fadein and fadeout
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level : "+level);
    var randomNumber=Math.floor(Math.random()*3)+1;
    var randomChosenColour=buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(400).fadeOut(400).fadeIn(400);


    //playsound(randomChosenColour);



}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function playsound(name){
    var audio=new Audio(name+".mp3");
    audio.play();
}



function wrong(){
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over , Press any key to Restart");
    playsound("wrong");
    startOver();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}