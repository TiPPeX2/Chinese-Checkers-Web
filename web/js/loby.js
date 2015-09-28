var OffsetArray = [12, 11, 10, 9, 0, 1, 2, 3, 4, 3, 2, 1, 0, 9, 10, 11, 12];
var HowManyInARow = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1];
var COLS = 25;
var ROWS = 17;
var GameData;
var move = {
    'start':{'x':0, 'y':0},
    'end':{'x':0, 'y':0}
    };
    
$(document).ready(function () {
    $.ajax({
        url: '../TurnData',
        success: function(data) {
               GameData = data;
               initBoard(data);
        },
        error: function(error) {
           $("#error").empty(); 
           $("#error").append
                    ("<p>Someting went wrong,Please refresh and try again<p>");
        }
    });
    
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
});

function initBoard(data){
    initGameBoardMabrlesColor(data.gameBoard);
    initMarbles(data.currentPlayer);
}

function initGameBoardMabrlesColor(gameBoard){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            $('#num-' + ((i * COLS) + j)).prop('disabled', true);
            if(gameBoard.board[i][j].color !== 'TRANSPARENT'){
                if(gameBoard.board[i][j].color === 'EMPTY')
                    $('#num-' + ((i * COLS) + j)).css('background-color', '#D8D8D8');
                else
                    $('#num-' + ((i * COLS) + j)).css('background-color', gameBoard.board[i][j].color);
            }
        }
    }
}

function initMarbles(currentPlayer){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            var possibleMoves =  GameData.currentPlayer.possibleMoves["java.awt.Point[x="+i+",y="+j+"]"];
            var marbId = '#num-' + ((i * COLS) + j);
            if(checkIfPointExists(i, j , currentPlayer.points)){
                if(possibleMoves.length !== 0)
                    enableMarble(marbId, marblePick);
            }else
                 disableMarble(marbId);
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
            if(checkIfPointExists(i, j , possibleMoves) || id === currId)
                enableMarble('#num-' + currId, marbleMove);
            else
                disableMarble('#num-' + currId);
        }
    }
}

function marbleDrop(){
    initMarbles(GameData.currentPlayer);
}

function marbleMove(){
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
            initBoard(data);
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
    $(marbId).prop('disabled', true);
    $(marbId).css('border-color', '#DDDDDD');    
}

function enableMarble(marbId, clickFunction){
     $(marbId).prop('disabled', false);
     $(marbId).css('border-color', '#5C5C5C');
     $(marbId).unbind();
     $(marbId).click(clickFunction);
}
