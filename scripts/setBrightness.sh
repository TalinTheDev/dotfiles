#!/usr/bin/env bash

pkill -RTMIN+5 waybar
brightnessctl set $1