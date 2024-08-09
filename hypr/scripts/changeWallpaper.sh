#!/usr/bin/env bash

wallpaperList=""
folderPath=~/.config/wallpapers/
file_list=$(ls $folderPath)

IFS=$'\n'
for file in $file_list; do
    wallpaperList+="$file|"
done

wallpaperList=${wallpaperList%?}

wallpaper="$folderPath/$(echo $wallpaperList | rofi -dmenu -sep '|' -p 'Wallpapers' -config ~/.cache/wal/colors-rofi-dark.rasi)"

swww img $wallpaper --transition-step 60
wal -i $wallpaper -n -t -s -q
