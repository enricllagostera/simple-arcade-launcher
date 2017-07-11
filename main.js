'use strict';

const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage');
const { ipcMain } = require('electron');
//require('electron-debug')({ showDevTools: true });
const { execFile } = require('child_process');

var mainWindow = null;
var gamesData = {};

/* APP EVENTS */

app.on('ready', () => {
    storage.get('config', function (error, data) {
        if (error) {
            console.log(error);
            throw error;
        }
        // console.log(data);
        gamesData = data;
        //event.returnValue = gamesData;

        // main window setup
        mainWindow = new BrowserWindow({
            width: gamesData.screen_width,
            height: gamesData.screen_height,
            backgroundColor: '#000',
            fullscreen: gamesData.is_fullscreen,
            autoHideMenuBar: true
        });

        // open arcade window
        mainWindow.loadURL('file://' + __dirname + '/app/index.html');
    });
});

// make sure the app quits
app.on('window-all-closed', () => {
    app.quit();
});

// make sure the app quits
app.on('close-app', (arg) => {
    app.quit();
});

/* IPC MAIN EVENTS */

// when the app window opens
ipcMain.on('load-games-data', (event, arg) => {
    // load games list from config file and send to renderer
    event.returnValue = gamesData;
});

// when receives a game-chosen method from the renderer process
ipcMain.on('start-game', (event, arg) => {
    // process last dash if needed
    let folder = '';
    if (gamesData.games[arg].path[gamesData.games[arg].path.length - 1] != '/') {
        folder = '/';
    }
    // runs the game's executable file (must match the patter 'id.exe')
    ExecProcess(gamesData.games[arg].path + folder + gamesData.games[arg].id + ".exe", () => {
        mainWindow.restore();
        // notifies renderer when game finishes
        event.sender.send('game-finished');
    });
});

/* HELPER FUNCTIONS */

function ExecProcess(pathExe, cb) {
    let child = execFile(pathExe);
    // when the game process ends, do something
    child.on('exit', (code, signal) => {
        cb();
    });
}



