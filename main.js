'use strict';

const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage');
const { ipcMain } = require('electron');
const { Menu } = require('electron');
const { shell } = require('electron');
// require('electron-debug')({ showDevTools: true });
const { execFile } = require('child_process');

var mainWindow = null;
var gamesData = {};

/* APP EVENTS */

app.on('ready', () => {
    prepareMainMenu();

    // only loads the app windows after game data is loaded from JSON
    storage.get('config', function (error, data) {
        if (error) {
            // hard quit if data is not loaded
            app.quit();
            throw error;
        }
        if (data.arcade_name == undefined) {
            console.log("A valid config file was not found, loading example file.")
            data = exampleConfigFile();
            storage.set('config', data);
        }
        gamesData = data;

        // main window setup
        mainWindow = new BrowserWindow({
            width: gamesData.screen_width,
            height: gamesData.screen_height,
            backgroundColor: gamesData.bg_color,
            fullscreen: gamesData.is_fullscreen,
            fullscreenable: gamesData.is_fullscreen,
            autoHideMenuBar: true,
            resizable: false
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
    // runs the game's executable file
    execProcess(gamesData.games[arg].exec_path, () => {
        mainWindow.restore();
        // notifies renderer when game finishes
        event.sender.send('game-finished');
    });
});

/* HELPER FUNCTIONS */

function execProcess(pathExe, cb) {
    let child = execFile(pathExe);
    // when the game process ends, do something
    child.on('exit', (code, signal) => {
        cb();
    });
}

function prepareMainMenu() {
    const template = [
        {
            label: 'Setup',
            submenu: [
                {
                    label: 'Show config file in Explorer',
                    accelerator: 'CmdOrCtrl+S',
                    click(item, focusedWindow) {
                        console.log("Preparing to show config file.");
                        storage.has('config', (error, hasKey) => {
                            if (error) throw error;
                            if (!hasKey) {
                                storage.set('config', exampleConfigFile(), () => {
                                    console.log("Creating and showing example config file.");
                                    shell.showItemInFolder(app.getPath('userData') + '/storage/config.json');
                                });
                                return;
                            }
                            console.log("Showing config file in Explorer.");
                            shell.showItemInFolder(app.getPath('userData') + '/storage/config.json');
                        });
                    }
                }
            ]
        }
    ];
    let mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);
}

function exampleConfigFile() {
    return {
        "arcade_name": "Example arcade name",
        "bg_color": "#ff0",
        "bg_url": "",
        "select_button_id": 0,
        "exit_button_id": 1,
        "left_button_id": 14,
        "right_button_id": 15,
        "stick_index": 0,
        "screen_width": 1200,
        "screen_height": 650,
        "is_fullscreen": false,
        "games": [
            {
                "id": "game_unique_id",
                "name": "Example game",
                "info": "Any info you want.",
                "exec_path": "an_absolute_path_to_executable",
                "cover_path": "an_absolute_path_to_cover"
            }
        ]
    };
}



