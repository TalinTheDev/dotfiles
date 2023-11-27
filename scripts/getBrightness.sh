#!/usr/bin/env bash

max=$(brightnessctl max)
current=$(brightnessctl get)

brightness=$(awk -v max=$max -v current=$current 'BEGIN { print  (( current / max ) * 100) }')

if [[ $brightness == 100 ]];
then
    echo "󰃠  $brightness%"
    echo "$brightness%"
elif [[ $brightness -ge 50 ]];
then
    echo "󰃠  $brightness%"
    echo "$brightness%"
elif [[ $brightness -le 50 ]] && [[ $brightness -ge 25 ]];
then
    echo "󰃟  $brightness%"
    echo "$brightness%"
else
    echo "󰃞  $brightness%"
    echo "$brightness%"
fi
