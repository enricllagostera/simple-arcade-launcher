# Simple Arcade Launcher - SAL

**SAL** is an arcade launcher / menu to help people to run small collections of games at arcades. It's designed to be configurable through an external JSON file without recompilation. **SAL**'s basically a menu that shows a game's cover image, title, and info as defined in the JSON file, so players can choose and play. It supports input from gamepads (only Xbox 360 controllers have been tested), keyboard and mouse. It has been tested with Unity game builds without issues.

### Features

- Gamepad, keyboard and mouse support;
- Configurable via JSON (see example below):
    - Game infos and covers;
    - Background images and colors;
    - Menu resolution and fullscreen mode;
    - Audio for game change, game start and a music loop for the menu;
    - Button and stick indexes for gamepad support (test your controller at the [HTML5 Gamepad website](http://html5gamepad.com/) to get these indexes);
- Any images (game covers or menu backgrounds) can be `jpg`, `png` and `gif`. **GIIIIIFS**.
- Uses absolute paths to files (with forward slashes), so you don't need to mess with your files' organization;
- Works fine with Unity games (much better with their starting dialog disabled);

The reason behind using JSON files for the configuration is their readability and ease to edit (you just need a plain text editor like notepad). Then, you can keep several config files and switch between them just by renaming, so it's easy to have several different arcades ready with their own lists of games, sound and visuals.

![](docs/imgs/example.gif)

### How to configure

All the configurable information is defined at the `config.json` file (example below), stored in the `AppData\Roaming\Simple Arcade Launcher\storage` folder. To get to this file quickly in Explorer, you can press `Ctrl+S` while running **SAL** and the config file folder will open. Edit the file in a text editor with your arcade's information and then re-run **SAL**. You should be able to run your games via the launcher now.

```json
{
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
    "sfx_change_game": "c:/an_absolute_path_to_audio_file.wav",
    "sfx_start_game": "c:/an_absolute_path_to_audio_file.wav",
    "music_menu": "c:/an_absolute_path_to_audio_file.ogg",
    "games": [
        {
            "id": "game_unique_id",
            "name": "Example game",
            "info": "Any info you want.",
            "exec_path": "c:/an_absolute_path_to_executable",
            "cover_path": "c:/an_absolute_path_to_cover",
        }
    ]
}
```