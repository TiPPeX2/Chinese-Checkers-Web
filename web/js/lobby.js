var namesInterval;
var moveInterval;
var humanPlayers;
var players;
var names;
var isInside = false;

$(document).ready(function () {
    
    namesInterval = setInterval(getNames, 2000);
    getSettings();
    $("#waitingText").hide();
    $('#joinGame').submit(joinGame);
    $("#playerName").keyup(disableSubmit);
});

function getSettings(){
      $.ajax({
        url: '../gameSettings',
        type: "GET",
        success: function(data) {
            getNames();
            showSettings(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

function getNames(){
    
    $.ajax({
        url: '../nameList',
        type: "GET",
        success: function(data) {
            analayeNameList(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

function showSettings(gameSettings){
    humanPlayers = gameSettings.humanPlayers;
    $('#humansNumber').val(gameSettings.humanPlayers);
    $('#colorsNumber').val(gameSettings.colorNumber);
    $('#playersNumber').val(gameSettings.totalPlayers);
}

function showNames(playerNames){
    players = playerNames.length;
    if(humanPlayers !== 'undefined')
        updateWaitMsg();
    $('#players').empty();
    for (var i = 0;i < players;i++){
        $('#players').append("<li>" + playerNames[i] + "</li>")
    }
}

function joinGame(){
    var name = $('#playerName').val();
    $('#joinGameBtn').prop('disabled', true);
    
        $.ajax({
        url: '../nameList',
        type: "POST",
        data:{playerName: name},
        success: function(data) {
           analayeNameList(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    return false;
}

function disableSubmit(){
    var isNothing = $(this).val().length === 0;
    var isUnq = checkIfUnique($(this).val());
    
    if(!isUnq)
        $('#unqErr').text("Your name must be UNIQUE.");

    if(isNothing){
        $('#playerName').css('border-color', 'red');
        $('#unqErr').empty();
    }
    
    if(isNothing || !isUnq)
        $('#joinGameBtn').prop('disabled', true);
    else{
        $('#joinGameBtn').prop('disabled', false);
        $('#playerName').css('border-color','#AFA69D');
        $('#unqErr').empty();
    }
}

function checkIfUnique(name){
   for (var i = 0;i < players;i++){
        if(name === names[i])
            return false;
    }
    
    return true;
}

function updateWaitMsg(){
    var remaining = (humanPlayers - players);
    var msg = "";
    if(remaining === 0)
        msg = "Redirecting to game shortly..";
    else 
        msg = 'Waiting for ' + remaining + ' more players to start...';
 $('#waitingText').text(msg);
               
}

function movePlayer(){
   
   var remaining = (humanPlayers - players);
   if(remaining === 0){
       clearInterval(namesInterval);
       clearInterval(moveInterval);
       window.location = "game.html"; 
   }
}

function analayeNameList(data){
    names = data.names;
    showNames(names);
    if(data.isInside){
        isInside = true;
        $('#playerName').hide();
        $('#joinGame').hide();
        $('#waitingText').show();
        moveInterval = setInterval(movePlayer, 2000);
    }
}


window.onbeforeunload = function(){
    if(isInside && humanPlayers - players !== 0)
       $.ajax({
            url: '../clear',
            success: function(data) {
            },
            error: function(error) {
               $("#error").empty(); 
               $("#error").append
                        ("<p>Someting went wrong,Please refresh and try again<p>");
            }
        });
};