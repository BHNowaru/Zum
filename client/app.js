const { app, BrowserWindow, ipcMain } = require('electron')
const _log = console.log;
const io = require("socket.io-client");
var Window;

app.whenReady().then(() => {
    Window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    Window.loadFile("./index.html");
});

//macos only

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length <= 0) {
//         createWindow();
//     }
// })

const isTesting = true;
const Port = 2302
const IP = isTesting ? "http://localhost:" : "http://135.180.72.85:";

var Reconnecting = false;
var isConnecting = false; // throttle spam connect attempts
var hasConnected = false; // we use this instead of socket.Connected so if there is a reconnecting issue then it will show a ui

const Socket = io(IP + Port, {
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelayMax: 1500,
    reconnectionDelay: 1000,
    autoConnect: false,  
    forceNew: true,
    query: {
        auth: "ligmoid"
    }
})
    
Socket.on("connect_error", async () => {
    console.log("Failed to connect to Socket.");
    Window.webContents.send("sendToast", {
        text: "Unable to connect to Server.",
        duration: 1000,
        position: "right",
        gravity: "bottom",
        backgroundColor: "#ff6961"
    })
})

Socket.on("connect", () => {
    console.log("Successfully connected to Socket.")
    hasConnected = true;
    isConnecting = false;   
    Window.webContents.send("sendToast", {
        text: "Successfully connected to server.",
        duration: 2500,
        position: "right",
        gravity: "bottom"
    })
    setTimeout((e) => {
        if (Socket.connected) {
            Window.webContents.send("connected", true)
        }
    }, 1000)
})

Socket.on("disconnected", () => {
    console.log("Disconnected from Socket.")
    Window.webContents.send("sendToast", {
        text: "Disconnected from the server.",
        duration: 2500,
        position: "right",
        gravity: "bottom",
        backgroundColor: "#ff6961"
    }).showToast();
})

Socket.on("reconnecting", () => {
    console.log("Reconnecting...")
    Window.webContents.send("sendToast", {
        text: "Reconnecting...",
        duration: 1000,
        position: "right",
        gravity: "bottom"
    })
})

Socket.on("reconnect_failed", () => {
    if (hasConnected) {
        //create toast to show up in the middle of the screen (use position: absolute);
        //create a shitton of elements :Q
        isConnecting = false;
        Window.webContents.send("sendToast", {
            text: "Failed to connect to server after three attempts.",
            duration: 2500,
            position: "right",
            gravity: "bottom",
            backgroundColor: "#ff6961"
        })
        
    }
})

Socket.on("hello", (name, fn) => {
    console.log(name, "::", fn)

    console.log("sending callback");
    fn('ligma ass')
})
    
ipcMain.on("requestConnect", () => {
    
    if (isConnecting) {
        Window.webContents.send("sendToast", {
            text: "Slow down, please.",
            duration: 2500,
            position: "right",
            gravity: "bottom"
        });
        return;
    }
    if (Reconnecting) {
        return;
    } else if (!hasConnected) {
        isConnecting = true;
        console.log("requesting connect...")
        Window.webContents.send("sendToast", {
            text: "Connecting...",
            duration: 2500,
            position: "right",
            gravity: "bottom"
        })
        Socket.open();
        return;
    }

    if (Socket.connected) {
        console.log("Sending broadcast...");
        Socket.emit("hello", "world")
        return;
    }


})

