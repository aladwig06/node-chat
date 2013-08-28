/**
 *
 *  Todo check for user logged in and redirect if not
 *
 **/

$(function(){
                
    var user = getCookie();
    if (user == null){
       window.location.replace("http://localhost:8081/login.html");
    } else {
        $(".greeting").html("Hello " + user);
    }
    
    var url = 'http://localhost:8081';
    var id = Math.round($.now()*Math.random());
    var clients = {};
    
    var doc = $(document),
        socket = io.connect(url),
        main = $('#main_box'),
        input = $('#input_box'),
        send = $('#send'),
        logout = $('#logout');
    
    logout.click(function(){
       setCookie("andrewChat8080","", -1);
       window.location.replace("http://localhost:8081/login.html");
    });
    
    input.bind('keypress', function(e){
        if (e.keycode == 13 || e.which == 13){
            e.preventDefault();
            sendData();
        }
    });
    
    send.click(function(){
        sendData();
    });
    
    function sendData(){
        var txt = input.val();
        if(txt){
            var nt = {
                'text': txt,
                'user' : user,
                'time': displayTime()
            };
           appendMain(nt);
            socket.emit('input', nt);
        }
    }
    
    
    socket.on('input', function (data){
        if (data.id != id){
            appendMain(data);
        }
    });
                    
    var appendMain = function (t){
        var newText = ''+ t.user + ' [' + t.time + ']' + ': ' + t.text;
         main.append( newText + '<br>');
         main.scrollTop(main[0].scrollHeight);
            if(t.user == user){
                input.val('');
            }
    }
    
    function displayTime() {
        var str = "";
        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        var seconds = currentTime.getSeconds()
    
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        str += hours + ":" + minutes + ":" + seconds + " ";
        if(hours > 11){
            str += "PM"
        } else {
            str += "AM"
        }
        return str;
    }
    
    function getCookie(){
        var cookie = document.cookie;
        var cookieStart = cookie.indexOf(" " + "andrewChat8080" + "=");
        if (cookieStart == -1){
            cookieStart = cookie.indexOf("andrewChat8080" + "=");
        }
        if (cookieStart == -1){
            cookie = null;
        } else {
            cookieStart = cookie.indexOf("=", cookieStart) + 1;
            var cookieEnd = cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = cookie.length;
            }
            cookie = unescape(cookie.substring(cookieStart, cookieEnd));
        }
        
        return cookie;
    }
    function setCookie(cookieName, value, exdays){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null)? "" : "; expires = "+exdate.toUTCString());
        document.cookie = cookieName + "=" + cookieValue;
    }
                
});
             