var OffsetArray = [12, 11, 10, 9, 0, 1, 2, 3, 4, 3, 2, 1, 0, 9, 10, 11, 12];
var HowManyInARow = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1];
var COLS = 25;
var ROWS = 17;
var GameData;
var playerTimeout;
var turnTimeout;
var resetTimeout;
var count;
var move = {
    'start':{'x':0, 'y':0},
    'end':{'x':0, 'y':0}
    };
    
$(document).ready(function () {
    getTurnData();
    var index = 0;
    for (var i = 0; i < ROWS; i++){
        var rowID = "row" + i;
        $('#gameContainer').append("<div id='"+rowID+"'></div>");
        for (var j = 0; j < COLS; j++){
            var btnID = "num-" + index;
            $('#' + rowID).append("<input type='button' class='invisibleBtnBoard' id='"+btnID+"'>");
            index++;
        }
    }
   
    var index = 0;
    for (var i = 0; i < ROWS; i++)
    {
        index = i * COLS;
        index = index + OffsetArray[i];
        for (var j = 0; j < HowManyInARow[i]; j++)
        {
            $("#num-"+index).addClass("btnBoard");
            index += 2;
        }
    }
    
    $('#quitForm').submit(quit);
});

function initBoard(data){
    initGameBoardMabrlesColor(data.gameBoard);
    initMarbles(true);
}

function initGameBoardMabrlesColor(gameBoard){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            if(gameBoard.board[i][j].color !== 'TRANSPARENT'){
                if(gameBoard.board[i][j].color === 'EMPTY')
                    $('#num-' + ((i * COLS) + j)).css('background-color', '#D8D8D8');
                else
                    $('#num-' + ((i * COLS) + j)).css('background-color', gameBoard.board[i][j].color);
            }
        }
    }
}

function initMarbles(initAll){
    if(!GameData.isMyTurn){
        disableAllMarbles();
        turnTimeout = setTimeout(getTurnData,1000);
      if(!GameData.isGameOver){
           $('#messages').empty();
           $('#messages').append("<p>Current player is: " + GameData.currentPlayer.name + '<br>\
                                His colors are: ' + GameData.currentPlayer.colors + "</p>");
        }
    }
    else{
        for(var i = 0; i < ROWS; i++){
            for(var j = 0; j < COLS; j++){
                var possibleMoves =  GameData.currentPlayer.possibleMoves["java.awt.Point[x="+i+",y="+j+"]"];
                var marbId = '#num-' + ((i * COLS) + j);
                if(checkIfPointExists(i, j , GameData.currentPlayer.points)){
                    if(possibleMoves.length !== 0)
                        enableMarble(marbId, marblePick);
                }else
                     disableMarble(marbId);
            }
        }
        if(initAll){
            count = 31;
            countSeconds();
            playerTimeout = setInterval(countSeconds,1000);
        }
    }
}

function checkIfPointExists(x, y, points){
    for(var i = 0; i < points.length; i++){
        if(points[i].x === x && points[i].y === y)
            return true;
    }
    
    return false;
}

function marblePick(){
    
    var id = parseInt($(this)[0].id.slice(4, $(this)[0].id.length));
    var row = parseInt($(this)[0].parentNode.id.slice(3, $(this)[0].parentNode.id.length));
    var col = id - (row * COLS);
    move.start.x = row;
    move.start.y = col;
    
    $('#num-' + id).unbind();
    $('#num-' + id).click(marbleDrop);
    var possibleMoves =  GameData.currentPlayer.possibleMoves["java.awt.Point[x="+row+",y="+col+"]"];
    
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            var currId = (i * COLS) + j;
            if(checkIfPointExists(i, j , possibleMoves) || id === currId){
                if(id !== currId)
                    enableMarble('#num-' + currId, marbleMove);
            }
            else
                disableMarble('#num-' + currId);
        }
    }
}

function marbleDrop(){
    initMarbles(false);
}

function marbleMove(){
    clearInterval(playerTimeout);
    disableAllMarbles();
    var id = parseInt($(this)[0].id.slice(4, $(this)[0].id.length));
    var row = parseInt($(this)[0].parentNode.id.slice(3, $(this)[0].parentNode.id.length));
    var col = id - (row * COLS);
    move.end.x = row;
    move.end.y = col;
    $.ajax({
        url: '../move',
        type:"POST",
        data: {test:JSON.stringify(move)},
        dataType: 'json',
        success: function(data) {
            GameData = data;
            if(!data.isGameOver)
                initBoard(data);
            else
                doGameOver(data.currentPlayer.name);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
}

function disableAllMarbles(){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            var currId = (i * COLS) + j;
            disableMarble('#num-' + currId);
        }
    }  
}

function disableMarble(marbId){
    $(marbId).unbind();
    $(marbId).prop('disabled', true);
    $(marbId).css('border-color', '#DDDDDD');    
}

function enableMarble(marbId, clickFunction){
     $(marbId).prop('disabled', false);
     $(marbId).css('border-color', '#5C5C5C');
     $(marbId).unbind();
     $(marbId).click(clickFunction);
}

function doGameOver(winnerName){
    $('#messages').empty();
    $('#messages').append("<p>The winner is: " + winnerName + '<br> Game will reset shortly.</p>');
    if(resetTimeout === undefined){
        resetTimeout = setTimeout(reset,5000);
        clearInterval(playerTimeout);
    }
}

function quit(){
 
 clearInterval(playerTimeout);
 clearTimeout(turnTimeout);

   $.ajax({
        url: '../quit',
        success: function(data) {
            doTurn(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    window.location = "../index.html"; 
     return false;
}

function getTurnData(){
    $.ajax({
        url: '../TurnData',
        success: function(data) {
            if(data === false)
                window.location = "../index.html";
            else
                doTurn(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    
}

function reset(){
    $.ajax({
            url: '../reset',
            type:"POST",
            success: function(data) {
            },
            error: function(error) {
               $("#error").empty(); 
               $("#error").append
                        ("<p>Someting went wrong,Please refresh and try again<p>");
            }
        });
    window.location = "../index.html"; 
    return false;
}

function doTurn(data){
   GameData = data;
   
   if(data.isGameOver)
       doGameOver(data.currentPlayer.name);
   
    initBoard(data);   
}

function countSeconds(){
    count--;
    if(count % 3){
        $.ajax({
        url: '../TurnData',
        success: function(data) {
            GameData = data;
            resetOtherMarbles();
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    }
    
    if(count === 0)
        $("#quitForm").submit();
    else{
       $('#messages').empty();
       $('#messages').append("<p>" + GameData.currentPlayer.name +" it's you turn! <br>\
                            You have " + count + " seconds!, Your colors are: " + GameData.currentPlayer.colors + "</p>");
    }
}


function resetOtherMarbles(){
   if(GameData.isGameOver)
       doGameOver(GameData.currentPlayer.name);
   
    initGameBoardMabrlesColor(GameData.gameBoard);
}


window.onbeforeunload = function(){
   $.ajax({
            url: '../quit',
            success: function(data) {
            },
            error: function(error) {
               $("#error").empty(); 
               $("#error").append
                        ("<p>Someting went wrong,Please refresh and try again<p>");
            }
        });
};