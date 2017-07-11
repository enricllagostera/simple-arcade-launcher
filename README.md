# SAL - Simple Arcade Launcher

**SAL** is an arcade launcher / menu to help people to run small collections of games at arcades. It's designed to be configurable through an external JSON file without recompilation. **SAL**'s basically a menu that shows a game's cover image, title, and info as defined in the JSON file, so players can choose and play. It supports input from gamepads (only XBox 360 have been tested), keyboard and mouse. It has been tested with Unity game builds without issues.

![](docs/imgs/example.gif)

## How to configure

All the configurable information is defined at the `config.json` file (example below), stored in the `AppData\Roaming\Simple Arcade Launcher\storage` folder. To get to this file quickly in Explorer, you can press `Ctrl+C` while running **SAL**: it'll open the config file's folder. Edit the file with your arcade's information and then re-run **SAL**. You should be able to run your games via the launcher now.

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
    "games": [
        {
            "id": "game_unique_id",
            "name": "Example game",
            "info": "Any info you want.",
            "exec_path": "an_absolute_path_to_the_game_executable_file.exe",
            "cover_path": "an_absolute_path_to_the_game_cover.png"
        }
    ]
}
```