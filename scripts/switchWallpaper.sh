#!/usr/bin/env bash

wallpaperList=""
folderPath="/home/talin/Pictures/Wallpapers/"
wallpaperSafe="/home/talin/.config/scripts/settings/wallpaper"

file_list=$(ls $folderPath)

IFS=$'\n'
for file in $file_list; do
    wallpaperList+="$file|"
done

wallpaperList=${wallpaperList%?}

wallpaper="$folderPath/$(echo $wallpaperList | rofi -dmenu -sep '|' -p 'Wallpapers' -config ~/.cache/wal/colors-rofi-dark.rasi)"

echo $wallpaper > $wallpaperSafe

swww img $wallpaper --transition-step 60
wal -i $wallpaper -n  -q
killall -SIGUSR2 waybar
