$(function(){
    $("#newGameBtn").submit(function(){
        alert("ASD");
        $.ajax({
            url: this.action,
            success: function(data) {
                alert(data);
            },
            error: function(error) {
                alert("error");
            }
        });
        return false;
    });
});


