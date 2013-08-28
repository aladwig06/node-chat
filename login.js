$(function(){
    var userInput = $("#username"),
        loginButton = $("#login");
        
    userInput.bind('keypress', function(e){
        if(e.keycode == 13 || e.which == 13){
            e.preventDefault();
            logIn(); 
        }
    });
    
    loginButton.click(function(){
       logIn(); 
    });
    
    
    
    function logIn(){
        // Later check database for user
        var txt = userInput.val();
        if (txt){
            
            setCookie("andrewChat8080", txt, 1);
            window.location.replace("http://localhost:8081/chat.html");
        }
        
    }
    
    function setCookie(cookieName, value, exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null)? "" : "; expires = "+exdate.toUTCString());
        document.cookie = cookieName + "=" + cookieValue;
    }
});
             