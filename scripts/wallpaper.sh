#!/usr/bin/env bash

touch ~/.config/scripts/settings/initCount
runCount=$(cat ~/.config/scripts/settings/initCount)

if [[ $runCount != "1" ]]; then
    wallpaper=$(cat ~/.config/scripts/settings/wallpaper)

    wal -R

    swww init
    swww img $wallpaper --transition-step 60 

    sh /home/talin/.config/scripts/waybar.sh

    echo 1 > ~/.config/scripts/settings/initCount
fi