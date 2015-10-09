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
        $('#container').load('html/mainMenu.html',"",function(){
            $('#loadGameForm').submit(loadSubmit);
            
            $('#loadFile').change(fileChanged);
            
            var tried = getUrlParameter('triedLoad');
            if(tried){
                errorMsg = "<p >Your Xml File is corrupted please use other xml!<p>";
                $('#xmlError').append(errorMsg);
            }
            $('#happy').load('html/happy.html');
        });
        
        
        
        $("#newGameForm").submit(function(){
            $.ajax({
                url: this.action,
                success: function(data) {
                    window.location = "html/lobby.html";
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
        $('#sad').load('html/sad.html');
        var errorMsg  = "";
        if(gameState.started)
            errorMsg = "<p id='errorMsg'>Game already started, Please try again later!<p>";
        else if(gameState.inLoby){
            if(gameState.loaded)
                window.location = "html/loadLobby.html";
            else    
                window.location = "html/lobby.html";
        }
        else if(gameState.inGameSetting)
            errorMsg = "<p id='errorMsg'>There is a game that is being created, refresh soon and try to join!<p>";
        $('#container').append(errorMsg);
    }
}

function loadSubmit(){
    triedLoad = true;
    setTimeout(getMainMenu,1000);
}

function getMainMenu(){
   $.ajax({
        url: 'main',
        success: function(data) {
            if(data.loaded === false){
                window.location = "index.html?triedLoad=true";
            }
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function fileChanged(){
    if($(this).val() === undefined || $(this).val() === "")
        $('#loadGame').prop("disabled",true);
    else
        $('#loadGame').prop("disabled",false);
        
}