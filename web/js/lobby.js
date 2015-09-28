$(document).ready(function () {

    //interval to get names
    
    $('#joinGame').submit(joinGame);
    $("#playerName").keyup(disableSubmit);
});

function getNames(){
    
    $.ajax({
        url: '../nameList',
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

function showNames(players){
    $('#players').empty();
    for (var i = 0;i < players.length;i++){
        $('#players').append("<li>" + players[i] + "</li>")
    }
}

function joinGame(){
    name = $('#playerName').val();
    $('#joinGamebtn').prop('disabled', true);
    
        $.ajax({
        url: '../join',
        data:{name: name},
        success: function(data) {
            // showNames hide
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    //ajax
}

function disableSubmit(){
    
    if($(this).val().length === 0 || checkIfUnique()){
        $('#joinGamebtn').prop('disabled', true);
        $('#playerName').css('border-color', 'red');
    }
    else{
        $('#createGameBtn').prop('disabled', false);
    }
}
