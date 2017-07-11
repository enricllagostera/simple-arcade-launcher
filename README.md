# SAL - Simple Arcade Launcher

**SAL** is an arcade launcher to help people to run games at arcades. It's meant to be an easily configurable application, through an external JSON file. It is basically a shell that shows a game's cover image, title, and some info and which can run it. It supports input from gamepads (only XBox 360 have been tested), keyboard and mouse.

## How to configure

All the configurable information is defined at the `config.json` file (example below), stored in the `AppData\Roaming\Simple Arcade Launcher\storage` folder. To show this file in Explorer, you can press `Ctrl+C` while running SAL. Edit the file with your information and then run SAL again. You should be able to run your games via the launcher now.

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
            "path": "an_absolute_path"
        }
    ]
}
```