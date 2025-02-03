#!/bin/bash

for filename in ./public/icons/*.svg; do
	icon=$(echo $filename | cut -d '/' -f 5 | cut -d'.' -f 1);
	usage=$(find ./app -type f -print | xargs grep $icon | wc -l)

	if [ $usage == 0 ]; then
		rm "./public/icons/${icon}.svg";
		echo "Deleted '${icon}.svg'";
	fi
done
