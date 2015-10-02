var namesInterval;
var moveInterval;

var humanPlayers;
var players;
var names;
var namePicked;

$(document).ready(function () {
    
    namesInterval = setInterval(getNames, 2000);
    getSettings();
    $("#waitingText").hide();
    $('#joinGame').submit(joinGame);
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
        $('#players').append("<div><label>" + playerNames[i] + "</label> <input value='"+playerNames[i]+"' id='"+playerNames[i]+"' type='radio'></div>");
        $('#'+playerNames[i]).click(namePickedFunc);
    }
    if(namePicked !== undefined)
        $('#'+namePicked).prop('checked', true);
}

function namePickedFunc(){
    if(namePicked !== $(this).val())
        $('#'+namePicked).prop('checked', false);
    namePicked = $(this).val();
    $('#joinGameBtn').prop('disabled', false);
}



function joinGame(){
    $('#joinGameBtn').prop('disabled', true);
    
        $.ajax({
        url: '../nameList',
        type: "POST",
        data:{playerName: namePicked},
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

function updateWaitMsg(){
    var remaining = names.length;
    var msg = "";
    if(remaining === 0)
        msg = "Redirecting to game shortly..";
    else 
        msg = 'Waiting for ' + remaining + ' more players to start...';
 $('#waitingText').text(msg);
               
}

function movePlayer(){
   
   var remaining = names.length;
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
        $('#playerName').hide();
        $('#joinGame').hide();
        $('#waitingText').show();
        moveInterval = setInterval(movePlayer, 2000);
    }
}