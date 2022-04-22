set -e
export DATA_RAW_FOLDER=Data/NOAA/Data/raw
export STATIONS_JSON=Data/NOAA/Data/stations.json
if ! [ -e ${DATA_RAW_FOLDER}/ghcnd-stations.txt ]; then
	curl -s -o ${DATA_RAW_FOLDER}/ghcnd-stations.txt "https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt"
fi
cat ${DATA_RAW_FOLDER}/ghcnd-stations.txt | grep "US1CA" | node Data/NOAA/Processing/parseStations.js
echo $?
