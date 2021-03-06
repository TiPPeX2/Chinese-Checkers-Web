var gameSettings = {
    playerNumber: 2,
    playerName: "",
    howManyColors: 1,
    howManyHumans: 1
};
var isCreated = false;

function playersNumberChanged(){
    $('#humansNumber').empty();
    for(var i = 1; i <= gameSettings.playerNumber; i++){
        $("#humansNumber").append($('<option>',{
            value: i,
            text: i
        }));
    }
    if(gameSettings.playerNumber >= gameSettings.howManyHumans)
        $('#humansNumber').val(gameSettings.howManyHumans);
    
}

function colorsNumberChanged(){
    $('#colorsNumber').empty();
    for(var i = 1; i <= 6 / gameSettings.playerNumber; i++){
        $("#colorsNumber").append($('<option>',{
            value: i,
            text: i
        }));
    }
     if(6 / gameSettings.playerNumber >= gameSettings.howManyColors)
        $('#colorsNumber').val(gameSettings.howManyColors);
}

$(function(){
    
    $("#playersNumber").change(function(){
    gameSettings.playerNumber = $(this).val();
    playersNumberChanged();
    colorsNumberChanged();
    });

    $("#humansNumber").change(function(){
        gameSettings.howManyHumans = $(this).val();
    });
    
     $("#playerName").keyup(function(){
        gameSettings.playerName = $(this).val();
        if($(this).val().length === 0){
            $('#createGameBtn').prop('disabled', true);
            $('#playerName').css('border-color', 'red');
        }
        else{
            $('#createGameBtn').prop('disabled', false);
            $('#playerName').css('border-color', '#AFA69D');
        }
    });
    
     $("#colorsNumber").change(function(){
        gameSettings.howManyColors = $(this).val();
    });

    playersNumberChanged();
    colorsNumberChanged();
    
    $("#createGameForm").submit(function(){
        isCreated = true;
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            url: this.action,
            success: function(data) {
                //should be auto redirected via servlet here!
                 if(gameSettings.howManyHumans === 1)
                     window.location = "game.html";  
                 else
                     window.location = "lobby.html";  
            },
            error: function(error) {
               $("#error").empty(); 
               $("#error").append
                        ("<p>Someting went wrong,Please refresh and try again<p>");
            }
        });
        return false;
    });
});

window.onbeforeunload = function(){
   if(!isCreated)
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


