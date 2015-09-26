$(function(){

    $("#newGameBtn").click(function(){
        $.ajax({
            url: "main",
            success: function(data) {
                alert(data);
            },
            error: function(error) {
                location.reload();
            }
        });
    });
});


