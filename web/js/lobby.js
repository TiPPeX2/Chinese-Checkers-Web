var players = false;

$(document).ready(function () {

    //interval to get names
    getNames();
    $('#joinGame').submit(joinGame);
    $("#playerName").keyup(disableSubmit);
});

function getNames(){
    
    $.ajax({
        url: '../nameList',
        type: "GET",
        success: function(data) {
            players = data;
            showNames();
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

function showNames(){
    $('#players').empty();
    for (var i = 0;i < players.length;i++){
        $('#players').append("<li>" + players[i] + "</li>")
    }
}

function joinGame(){
    name = $('#playerName').val();
    $('#joinGamebtn').prop('disabled', true);
    
        $.ajax({
        url: '../nameList',
        type: "POST",
        data:{name: name},
        success: function(data) {
            // showNames agian, hide join form, start move to game interval
            
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
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