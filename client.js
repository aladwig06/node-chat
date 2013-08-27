$(function(){
                var url = 'http://localhost:8081';
                var id = Math.round($.now()*Math.random());
                var clients = {};
                var doc = $(document),
                    socket = io.connect(url),
                    main = $('#main_box'),
                    input = $('#input_box'),
                    send = $('#send');
                
                //input.on('change', function (){
                //    sendData();
                //});
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
                            'id' : id,
                            'time': displayTime()
                        };
                       appendMain(nt);
                        socket.emit('input', nt);
                    }
                }
                input.on('key')
                
                socket.on('input', function (data){
                    if (data.id != id){
                        appendMain(data);
                    }
                });
                                
                var appendMain = function (t){
                    var newText = ''+ t.time + ' : ' + t.id + ' ' + t.text;
                     main.append( newText + '<br>');
                     main.scrollTop(main[0].scrollHeight);
                        if(t.id ==id){
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
                
                
                
                
});
             