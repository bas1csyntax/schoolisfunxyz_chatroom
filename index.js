const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Database = require("@replit/database");
const db = new Database();

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
httpserver.listen(3000);


var rooms = [];
var usernames = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

io.on('connection', function(socket) {

  socket.on("join", function(room, username) {
    if (username != "" && username.length <= 20 && !username.includes(" ")) {
      if (room != rooms[socket.id] || username != usernames[socket.id]) {
        rooms[socket.id] = room;
        usernames[socket.id] = username;
        socket.leaveAll();
        socket.join(room);
        if (room.includes("69")) {
          io.in(room).emit("recieve", "[Server] " + username + " has entered " + room + ", nice.");
        } else if (username.toLowerCase() == "impostor") {
          io.in(room).emit("recieve", "[Server] The impostor is among us");
        } else if (username.toLowerCase().includes("ted")) {
          io.in(room).emit("recieve", "[Server] " + username + " has farted into " + room + ".");
        } else if (room.toLowerCase().includes("your house")) {
          io.in(room).emit("recieve", "[Server] " + username + " has entered " + room + ". Watch out.");
        } else if (room.toLowerCase().includes("rule 34")) {
          io.in(room).emit("recieve", "[Server] " + username + " has 💦 to " + room + ".");
        } else if (username.toLowerCase().includes("sus")) {
          io.in(room).emit("recieve", "[Server] " + username + " has joined " + room + ". ඞ");
        } else if (username.toLowerCase() == "i") {
          io.in(room).emit("recieve", "[Server] " + username + " have entered " + room + ".");
        } else {
          io.in(room).emit("recieve", "[Server] " + username + " has entered " + room + ".");
        }
        socket.emit("join", room);
      }
    }
  })
  socket.on("send", function(message) {

    if (message.length <= 211100) {
      //xss protection
      message = replaceAll(message, "<", "&lt;");
      message = replaceAll(message, ">", "&gt;");
      //secret shortcuts
      message = replaceAll(message, ":scream:", "No.");
      message = replaceAll(message, ":jazz:", "🐝");
      message = replaceAll(message, ":sus:", "🍆");
      message = replaceAll(message, ":amogus1:", "📮");
      message = replaceAll(message, ":amogus2:", "ඞ");
      message = replaceAll(message, "Click", "2006 film Click Starring Adam Sandler");
      message = replaceAll(message, ":invisible:", "")
      //regional indicators
      message = replaceAll(message, ":ri-a:", "🇦");
      message = replaceAll(message, ":ri-b:", "🇧");
      message = replaceAll(message, ":ri-c:", "🇨");
      message = replaceAll(message, ":ri-d:", "🇩");
      message = replaceAll(message, ":ri-e:", "🇪");
      message = replaceAll(message, ":ri-f:", "🇫");
      message = replaceAll(message, ":ri-g:", "🇬");
      message = replaceAll(message, ":ri-h:", "🇭");
      message = replaceAll(message, ":ri-i:", "🇮");
      message = replaceAll(message, ":ri-j:", "🇯");
      message = replaceAll(message, ":ri-k:", "🇰");
      message = replaceAll(message, ":ri-l:", "🇱");
      message = replaceAll(message, ":ri-m:", "🇲");
      message = replaceAll(message, ":ri-n:", "🇳");
      message = replaceAll(message, ":ri-o:", "🇴");
      message = replaceAll(message, ":ri-p:", "🇵");
      message = replaceAll(message, ":ri-q:", "🇶");
      message = replaceAll(message, ":ri-r:", "🇷");
      message = replaceAll(message, ":ri-s:", "🇸");
      message = replaceAll(message, ":ri-t:", "🇹");
      message = replaceAll(message, ":ri-u:", "🇺");
      message = replaceAll(message, ":ri-v:", "🇻");
      message = replaceAll(message, ":ri-w:", "🇼");
      message = replaceAll(message, ":ri-x:", "🇽");
      message = replaceAll(message, ":ri-y:", "🇾");
      message = replaceAll(message, ":ri-z:", "🇿");
      //normal shortcuts
      message = replaceAll(message, ":smile:", "😀");
      message = replaceAll(message, ":laugh:", "😂");
      message = replaceAll(message, ":love:", "😍");
      message = replaceAll(message, ":wink:", "😉");
      message = replaceAll(message, ":halo:", "😇");
      message = replaceAll(message, ":kiss:", "😘");
      message = replaceAll(message, ":shh:", "🤫");
      message = replaceAll(message, ":cry:", "😭");
      message = replaceAll(message, ":please:", "🥺");
      message = replaceAll(message, ":heart:", "❤️");
      message = replaceAll(message, ":like:", "👍");
      message = replaceAll(message, ":shiny:", "✨");
      message = replaceAll(message, ":fire:", "🔥");
      message = replaceAll(message, ":100:", "💯");
      message = replaceAll(message, ":pride:", "🏳️‍🌈");
      message = replaceAll(message, ":trans:", "🏳️‍⚧️");
      message = replaceAll(message, ":disgust:", "🤢")


      io.in(rooms[socket.id]).emit("recieve", usernames[socket.id] + " : " + message);


    }
  })

  socket.on("recieve", function(message) {
    socket.emit("recieve", message);

  })
})


startCommands();

function startCommands() { // I added some comments to explain how to make your own commands - C0mplexity
  console.log("\n ==READY== ");
  rl.question('', (answer) => {
    var args = answer.split(" ");
    switch (args[0].toLowerCase()) {
      case "bc": // Case "Command Name":
        args.shift(); // Remove the command name from args (not compulsory, but I recommend it)

        var message = args.join(" "); // Code for the command
        io.emit("recieve", "[BROADCAST] " + message);

        startCommands(); // Once the code has been completed, allow the  user to execute commands again
        break; // Prevents the "Unknown Command." message from appearing
      case "help": // Then add your command to the help menu
        console.log("-- HELP --\n- bc <message>\nBroadcasts a message to all rooms\n- bcraw <message>\nBroadcasts a message to all rooms with no prefix\n- bcroom <raw (true/false)> <room> <message>\nBroadcasts a message to a specific room with/without a prefix\n- /kill\nTakes all users online to a \"You died\" screen");
        startCommands();
        break;
      case "bcraw":
        args.shift();
        var message = args.join(" ");
        io.emit("recieve", message);
        startCommands();
        break;
      case "bcroom":
        args.shift();
        var raw = args.shift();
        var room = args.shift();
        var message = args.join(" ");
        if (raw.toLowerCase() == "true") {
          io.in(room).emit("recieve", message);
          console.log("{" + room + "} " + message);
        } else if (raw.toLowerCase() == "false") {
          io.in(room).emit("recieve", "[BROADCAST] " + message);
          console.log("{" + room + "} " + "[BROADCAST] " + message);
        } else {
          console.log("Invalid syntax! bcroom <raw (true/false)> <room> <message>");
        }
        startCommands();
        break;
      case "search":
        args.shift();
        console.log("--[USER LIST]--");
        for (var name in usernames) {
          console.log("- " + usernames[name] + " | " + rooms[name]);
        }
        startCommands();
        break;
        var user = "";
        for (var name in usernames) {
          if (usernames[name] == args[0]) {
            user = name;
            break;
          }
        }
      case "getid":
        args.shift();
        if (args.length == 1) {
          var user = "";
          for (var name in usernames) {
            if (usernames[name] == args[0]) {
              user = name;
              break;
            }
          }

          if (user == "") {
            console.log("That's not a user u idiot");
          } else {
            console.log(name);
          }
        }
        startCommands();
        break;
      case "potato":
        args.shift();
        console.log("lol what");
        startCommands();
        break;
      case "/kill":
        console.log("lmao");
        io.emit("die");
        startCommands();
        break;
      case "/forcedie":
        var time = 1;
        args.shift();
        var interval = setInterval(function() {
          io.emit("die");
        }, 1000);
        startCommands();
        break;
      default:
        console.log("Unknown command. Type \"help\" for help.");
        startCommands();
        break;
      case "ban":
        args.shift();
        var userName = args.join("asad");
        if (usernames.includes(userName)) {
          // Reload specific user's page
          var userSocketId = usernames.indexOf(userName);
          io.to(userSocketId).emit("recieve", "You've been banned. Redirecting to banned.html");
          io.to(userSocketId).disconnect();
        } else {
          console.log("User not found.");
        }
        startCommands();
        break;
    }
  });
}