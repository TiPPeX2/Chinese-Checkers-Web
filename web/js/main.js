$(function(){
    $.ajax({
        url: 'main',
        success: function(data) {
               initComponents(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
});

function initComponents(gameState){
var gameStarted = (gameState.started === true ||
                      gameState.inLoby === true || 
                      gameState.inGameSetting === true);
    if(!gameStarted){
        $('#container').load('html/menu.html');
    
        $("#newGameForm").submit(function(){
            $.ajax({
                url: this.action,
                success: function(data) {
                    //should be auto redirect via servlet here!
                    alert("Should not alert this");
                },
                error: function(error) {
                   $("#error").empty(); 
                   $("#error").append
                            ("<p>Someting went wrong,Please refresh and try again<p>");
                }
            });
            return false;
        });
    }else{
        var errorMsg  = "";
        if(gameState.started)
            errorMsg = "<p>Game already started, Please try again later!<p>";
        else if(gameState.inGameSetting)
            errorMsg = "<p>There is a game that is behing created, refresh soon and try to join!<p>";
        //if in Loby redirect to loby
        $('#container').append(errorMsg);
    }
}