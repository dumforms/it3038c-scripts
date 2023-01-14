#!/bin/bash
# This script downloads covid data and displays it

# Downloaded data
DATA=$(curl -s https://api.covidtracking.com/v1/us/current.json)

# Machine variables
DAY=$(date +"%B %d")
TIME=$(date +%H:%M:%S)

# Parsed values
POSITIVE=$(echo $DATA | jq '.[0].positive')
HOSPITALIZED=$(echo $DATA | jq '.[0].hospitalizedCurrently')
ICU=$(echo $DATA | jq '.[0].inIcuCurrently')
VENTILATOR=$(echo $DATA | jq '.[0].onVentilatorCurrently')

# Computed values
PERCENT_ICU=$(($ICU*100/$HOSPITALIZED))
PERCENT_VENTILATOR=$(($VENTILATOR*100/$HOSPITALIZED))

# Output
echo "United States COVID Data for $DAY, queried at $TIME."
echo "$POSITIVE new positive COVID cases were reported."
printf "%s people are currently hospitalized.\n" $HOSPITALIZED
printf "\t%s of them (approximately %s%%) are in Intensive Care Units.\n" $ICU $PERCENT_ICU
printf "\t%s of them (approximately %s%%) are on ventilators.\n" $VENTILATOR $PERCENT_VENTILATOR
