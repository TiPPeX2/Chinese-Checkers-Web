var m_OffsetArray = [12, 11, 10, 9, 0, 1, 2, 3, 4, 3, 2, 1, 0, 9, 10, 11, 12];
var m_HowManyInARow = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1];
    
$(document).ready(function () {
    
    var index = 0;
    for (var i = 0; i < 17; i++){
        var rowID = "row" + i;
        $('#gameContainer').append("<div id='"+rowID+"'></div>");
        for (var j = 0; j < 25; j++){
            var btnID = "num" + index;
            //btn.addEventListener("click", ButtonClicked);
            $('#'+rowID).append("<input type='button' class='invisibleBtnBoard' id='"+btnID+"'>");
            index++;
        }
    }
   
    var index = 0;
    for (var i = 0; i < 17; i++)
    {
        index = i * 25;
        index = index + m_OffsetArray[i];
        for (var j = 0; j < m_HowManyInARow[i]; j++)
        {
            $("#num"+index).addClass("btnBoard");
            index += 2;
        }

    }
});