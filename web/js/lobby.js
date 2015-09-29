var namesInterval;
var moveInterval;

var humanPlayers;
var players;
var names;

$(document).ready(function () {

    namesInterval = setInterval(getNames, 2000);
    $("#waitingText").hide();
    getSettings();
    $('#joinGame').submit(joinGame);
    $("#playerName").keyup(disableSubmit);
});

function getSettings(){
      $.ajax({
        url: '../gameSettings',
        type: "GET",
        success: function(data) {
            showSettings(data);
            showNames(data.playerNames);
            names = data.playerNames;
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
            showNames(data);
            names = data;
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
            names = data;
            showNames(data);
            $('#joinGame').hide();
            $('#playerName').hide();
            updateWaitMsg();
            $('#waitingText').show();
            moveInterval = setInterval(movePlayer, 2000);
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
        msg = "Redirecting to game shoortly..";
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