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
    
    $("#createGameBtn").submit(function(){
        $.ajax({
            url: this.action,
            success: function(data) {
                alert(data);
            },
            error: function(error) {
                alert("error");
            }
        });
    });
});


