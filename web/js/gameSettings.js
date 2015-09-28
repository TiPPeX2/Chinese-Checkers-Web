var gameSettings = {
    playerNumber: 2,
    playerName: "",
    howManyColors: 1,
    howManyHumans: 1
};


function playersNumberChanged(){
    $('#humansNumber').empty();
    for(var i = 1; i <= gameSettings.playerNumber; i++){
        $("#humansNumber").append($('<option>',{
            value: i,
            text: i
        }));
    }
}

function colorsNumberChanged(){
    $('#colorsNumber').empty();
    for(var i = 1; i <= 6 / gameSettings.playerNumber; i++){
        $("#colorsNumber").append($('<option>',{
            value: i,
            text: i
        }));
    }
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
        }
    });
    
     $("#colorsNumber").change(function(){
        gameSettings.howManyColors = $(this).val();
    });

    playersNumberChanged();
    colorsNumberChanged();
    
    $("#createGameForm").submit(function(){
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            url: this.action,
            success: function(data) {
                //should be auto redirected via servlet here!
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


