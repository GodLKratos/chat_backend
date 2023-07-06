const express = require("express");
const {createServer} =  require("http");
const {Server} = require("socket.io");


const app = express();
const httpserver = createServer(app);
const io =new Server(httpserver);


app.get("/",(req,res)=>{
    res.send("Hello from Sachin saini");
});
io.on("connection",(socket)=>{
    socket.join("room");
    console.log("Someone is connected");
    socket.on("sendmsg",(msg)=>{
        console.log(msg);
        io.to("room").emit("sendmsgserver",{...msg,type:"othermsg"})
    })
})

httpserver.listen(3000,()=>{
    console.log("port connected");
})