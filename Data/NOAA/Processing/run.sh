set -xe
ROOT=$(git rev-parse --show-toplevel)

DATA_RAW_FOLDER=${ROOT}/Data/NOAA/Data/raw
STATIONS_JSON=${ROOT}/Data/NOAA/Data/stations.json

mkdir -o ${DATA_RAW_FOLDER}

if ! [ -e ${DATA_RAW_FOLDER}/ghcnd-stations.txt ]; then
	curl -s -o - "https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt" | grep US1CA > ${DATA_RAW_FOLDER}/ghcnd-stations.txt
fi
node ${ROOT}Data/NOAA/Processing/parseStations.js ${DATA_RAW_FOLDER}/ghcnd-stations.txt ${STATIONS_JSON}

