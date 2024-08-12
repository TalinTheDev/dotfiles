#!/usr/bin/env bash


wallpaperList=""
folderPath=~/Pictures/Wallpapers
file_list=$(ls $folderPath)

IFS=$'\n'
for file in $file_list; do
    wallpaperList+="$file|"
done

wallpaperList=${wallpaperList%?}

wallpaper="$folderPath/$(echo $wallpaperList | rofi -dmenu -sep '|' -p 'Wallpapers' -config ~/.cache/wal/colors-rofi-dark.rasi)"
wallpaper(){
  echo $wallpaper | sed -r 's/\/\/+/\//g'
}

swww img $wallpaper --transition-step 60
wallpaper=$(wallpaper)

sh ~/.config/hypr/scripts/generateColors.sh "$wallpaper" skip &&
ags -q && ags 
