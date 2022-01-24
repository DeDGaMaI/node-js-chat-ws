const {WebSocketServer, WebSocket} = require("ws");

const server = new WebSocketServer({port: 3000});

server.on("connection", ws => {
    ws.on("message", msg => {
        var buff = new Buffer(msg, 'utf8');
        var hex = buff.toString("hex");//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(str.toString())
            }
        })
    })
    ws.send("Welcome!")
})