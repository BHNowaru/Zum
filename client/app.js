const { app, BrowserWindow } = require('electron')

function createWindow() {
    const Window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    Window.loadFile("./index.html");
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length <= 0) {
        createWindow();
    }
})