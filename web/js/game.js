var m_OffsetArray = [12, 11, 10, 9, 0, 1, 2, 3, 4, 3, 2, 1, 0, 9, 10, 11, 12];
var m_HowManyInARow = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1];
    
$(document).ready(function () {
    $.ajax("/getBoardData")
    
    var $divContainer = $('.Mycontainer');
    var index = 0;
    var AllButtons = document.createElement("div");
    AllButtons.setAttribute("class", "AllButtons");
    for (var i = 0; i < 17; i++)
    {
        var div = document.createElement("div");
        for (var j = 0; j < 25; j++)
        {
            var btn = document.createElement("BUTTON");
            btn.setAttribute("id", "num" + index.toString());
            btn.setAttribute("style", "visibility:hidden");
            btn.style.width = "30px";
            btn.style.height = "30px";
            btn.addEventListener("click", ButtonClicked);
            div.setAttribute("class", "row" + i.toString());
            div.appendChild(btn);
            index++;
        }
        AllButtons.appendChild(div);
    }

    $divContainer.append(AllButtons);

    var index = 0;
    for (var i = 0; i < 17; i++)
    {
        index = i * 25;
        index = index + m_OffsetArray[i];
        for (var j = 0; j < m_HowManyInARow[i]; j++)
        {
            document.getElementById("num" + index.toString()).style.visibility = "visible";
            document.getElementById("num" + index.toString()).style.background = '#FFFFFF';
            index += 2;
        }

    }

    $.ajax({
        type: 'GET',
        datatype: 'JSON', 
        url: 'CreateGameBoard',
        error: function () {
            console.log("Failed to sumbit");
        },
        success: function (data) {
            
            //console.log(JSON.stringify(data));
            createGameButtonColors(data.m_NumOfPlayers);
        }
    });
});

function ButtonClicked() {
    $.ajax({
        type: 'GET',
        url: 'CreateGameBoard',
        error: function () {
            console.log("Failed to sumbit");
        },
        success: function (data) {
            alert(data);
        }
    });
}
function createGameButtonColors(numOfplayers) 
{
    switch (parseInt(numOfplayers))
    {
        case 2:
            initTwoPlayers();
            break;

        case 3:
            initThreePlayers();
            break;

        case 4:
            initFourPlayers();
            break;

        case 6:
            initSixPlayers();
            break;
        default:
            break;
    }
}
function initTwoPlayers() {
    for (var i = 0; i < 4; i++) {
        index = i * 25;
        index = index + m_OffsetArray[i];
        for (var j = 0; j < m_HowManyInARow[i]; j++) {
            document.getElementById("num" + index.toString()).style.background = '#FFFF00';
            index += 2;
        }
    }
    for (var i = 13; i < 17; i++)
    {
        index = i * 25;
        index = index + m_OffsetArray[i];
        for (var j = 0; j < m_HowManyInARow[i]; j++)
        {
            document.getElementById("num" + index.toString()).style.background = '#008000';
            index += 2;
        }
    }
}
function initThreePlayers()
    {
        initTwoPlayers();
        howMany = 1;
        for (var i = 9; i < 13; i++) 
        {
            index = i * 25;
            index = index + m_OffsetArray[i];
            for (var  j = 0; j < howMany ; j++) 
            {
                document.getElementById("num" + index.toString()).style.background = '#000000';
                index += 2; 
            }
            howMany++;
        }
    }
    
     function initFourPlayers() {
        initThreePlayers();
        index;
        howMany = 4;
        helper = 18;
        for (var i = 4; i < 8; i++) {
            index = i * 25 + helper;
            for (var j = 0; j < howMany; j++) {
                document.getElementById("num" + index.toString()).style.background = '#3399FF';
                index += 2;
            }
            helper ++;
            index = 0;
            howMany--;
        }

    }
     function initSixPlayers() {
       initFourPlayers();

        index;
        howMany = 4;
        helper = 21;

        for (var i = 4; i < 8; i++) 
        {
            index = i * 25 + m_OffsetArray[i];
            for (var j = 0; j < howMany; j++) 
            {
               document.getElementById("num" + index.toString()).style.background = '#FF0000';
                index += 2;
            }
            howMany--;
        }
        
        howMany = 1;
        for (var i = 9; i < 13; i++) 
        {
            index = i *25 + helper;
            for (var j = 0; j < howMany; j++) {
                document.getElementById("num" + index.toString()).style.background = '#FF00FF';
                index += 2;
            }
            index = 0;
            howMany++;
            helper--;
        }
        
    }