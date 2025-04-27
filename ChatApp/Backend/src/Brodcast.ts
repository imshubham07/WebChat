import { WebSocketServer , WebSocket} from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSocket:WebSocket[] = [];

wss.on("connection", (socket) => {
  allSocket.push(socket);

  userCount = userCount + 1;
  console.log("user Connected #" );

  socket.on("message", (message) => {
    console.log("message received " + message.toString());

    for (let i = 0; i < allSocket.length; i++) {
      const s = allSocket[i];
      s.send(message.toString() + ": send from the server");
    }
  });
});
