#! /usr/bin/env bash

echo $'Manage Monitors\n\n'

monitors="$(hyprctl monitors all -j)"
monitorCount="$(echo $monitors | jq length)"

echo "Avaliable monitors:"

# Loop through each monitor and echo out its number (allows user to reference it), name, and its status
for((i = 0; i < $monitorCount; i++)); do
	monitor="$(echo $monitors | jq .[$i])"
	monitorName="$(echo $monitor | jq -r .name)"
	if [[ "$(echo $monitor | jq .disabled)" == "true" ]] then
		monitorStatus="OFF" 
	else
		monitorStatus="ON" 
	fi	
	echo "[$(($i + 1))] $monitorName: $monitorStatus"
done

while true; do
	read -n 1 input
	if [[ "$input" == "q" ]] || [[ "$input" == "Q" ]] then
		break
	else
		read input2
		input="$input$input2"
		echo $input
	fi
done
