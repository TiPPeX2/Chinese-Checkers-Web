$(function(){

    $("#newGameBtn").submit(function(){
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


