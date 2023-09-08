import express from 'express';
import { WebSocketServer, WebSocket } from "ws";
import configure from './routers';

const app = express();
const port = process.env.PORT || 3000;

function onSocketPreError(e: Error) {
    console.log(e);
}

function onSocketPostError(e: Error) {
    console.log(e);
}

configure(app);

console.log(`Attempting to run server on port ${port}`);

const s = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const wss = new WebSocketServer({ noServer:true});

s.on('upgrade', (req,socket,head) => {
    socket.on('error', onSocketPreError)
})