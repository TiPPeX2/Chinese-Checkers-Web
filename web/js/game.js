var m_OffsetArray = [12, 11, 10, 9, 0, 1, 2, 3, 4, 3, 2, 1, 0, 9, 10, 11, 12];
var m_HowManyInARow = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1];
var COLS = 25;
var ROWS = 17;
    
$(document).ready(function () {
    $.ajax({
        url: '../TurnData',
        success: function(data) {
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
            var btnID = "num" + index;
           // $('#' + btnID).click(marblePick);
            $('#' + rowID).append("<input type='button' class='invisibleBtnBoard' id='"+btnID+"'>");
            index++;
        }
    }
   
    var index = 0;
    for (var i = 0; i < ROWS; i++)
    {
        index = i * COLS;
        index = index + m_OffsetArray[i];
        for (var j = 0; j < m_HowManyInARow[i]; j++)
        {
            $("#num"+index).addClass("btnBoard");
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
            $('#num' + ((i * COLS) + j)).prop('disabled', true);
            if(gameBoard.board[i][j].color !== 'TRANSPARENT'){
                if(gameBoard.board[i][j].color === 'EMPTY')
                    $('#num' + ((i * COLS) + j)).css('background-color', '#D8D8D8');
                else
                    $('#num' + ((i * COLS) + j)).css('background-color', gameBoard.board[i][j].color);
            }
        }
    }
}

function initMarbles(currentPlayer){
    for(var i = 0; i < ROWS; i++){
        for(var j = 0; j < COLS; j++){
            if(checkIfPointExists(i, j , currentPlayer.points)){
                 $('#num' + ((i * COLS) + j)).prop('disabled', false);
                 $('#num' + ((i * COLS) + j)).css('border-color', '#5C5C5C');
             }
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