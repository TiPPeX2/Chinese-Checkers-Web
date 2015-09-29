$(document).ready(function () {

    //interval to get names
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
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

function showSettings(gameSettings){
    $('#humansNumber').val(gameSettings.humanPlayers);
    $('#colorsNumber').val(gameSettings.colorNumber);
    $('#playersNumber').val(gameSettings.totalPlayers);
}

function showNames(players){
    $('#players').empty();
    for (var i = 0;i < players.length;i++){
        $('#players').append("<li>" + players[i] + "</li>")
    }
}

function joinGame(){
    var name = $('#playerName').val();
    $('#joinGamebtn').prop('disabled', true);
    
        $.ajax({
        url: '../nameList',
        type: "POST",
        data:{playerName: name},
        success: function(data) {
            $('#joinGame').hide();
            $('#playerName').hide();
            $('#waitingText').empty();
            $('#waitingText').append('<h1>Waiting for more players to start...<h1>');
            showNames(data);
            //  hide join form, start move to game interval
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
    var isUnq = true;
    if($(this).val().length === 0){
        if(checkIfUnique()){
            $('#joinGamebtn').prop('disabled', true);
            $('#playerName').css('border-color', 'red');
        }
        else
            isUnq = false;
    }
    else{
        $('#joinGameBtn').prop('disabled', false);
        $('#joinGameBtn').css('border-color','none');
    }
    if(isUnq === false)
        $('#unqErr').val("Your name must be UNIQUE.");
    else
        $('#unqErr').empty();
        
}

function checkIfUnique(name){
    if(players === false)
        return false;
    
   for (var i = 0;i < players.length;i++){
        if(name === players[i])
            return false;
    }
    
    return true;
}