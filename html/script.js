var socket;
var usernameInput;
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;



function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom : " + room;
  })

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length < 13){
      messages.push(message);
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
    } 
  })

  socket.on("die", function() {
    location.replace("./youdied.html");
  })
}

function Connect(){
  if (!usernameInput.value.includes(" ")) {
    socket.emit("join", chatIDInput.value, usernameInput.value);
  }
}

function Send(){
  if (messageInput.value.length <= 100) {
    if (delay && messageInput.value.replace(/\s/g, "") != ""){
      delay = false;
      setTimeout(delayReset,0);
      socket.emit("send", messageInput.value);
      messageInput.value = "";
    }
  }
}

function delayReset(){
  delay = true;
}