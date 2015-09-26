var gameSettings = {
    playerNumber: 2,
    playerName: "",
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

$(function(){
    
    $("#playersNumber").change(function(){
    gameSettings.playerNumber = $(this).val();
    playersNumberChanged();
    });

    $("#humansNumber").change(function(){
        gameSettings.howManyHumans = $(this).val();
    });

    playersNumberChanged();
    
    $("#createGameForm").submit(function(){
        $.ajax({
            type: "POST",
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


