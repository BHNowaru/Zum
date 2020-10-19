
//initialize particles using particlesjs (not particles.js. two different things.)
const Particles = require("particlesjs")
window.onload = function() {
    Particles.init({
        selector: "#particles",
        color: "#F0EDEE",
    })
}
setTimeout(() => {
    $("#connect").removeAttr("disabled")
}, 3000)
//allow connecting to socket
const io = require("socket.io-client");
var Reconnecting = false;
const Socket = io("135.180.72.85:777", {
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelayMax: 3500,
    reconnectionDelay: 3000,
    autoConnect: false,  
    query: {
        auth: "ligmoid"
    }
})

    
Socket.on("connect_error", async () => {
    console.log("Failed to connect to Socket.");
})

Socket.on("connect", () => {
    console.log("Successfully connected to Socket.")
})

Socket.on("disconnected", () => {
    console.log("Disconnected from Socket.")
})

Socket.on("reconnecting", () => {
    console.log("Reconnecting...")
})

Socket.on("reconnect_failed", () => {
    console.log("Reconnect failed.")
})

$("#connect").on("click", () => {
    if (Reconnecting || Socket.connected) {
        return;
    }

    Socket.open();
})