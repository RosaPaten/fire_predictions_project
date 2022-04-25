const STATION_RAW = "Data/NOAA/Data/relevant-stations.txt";
const OUTPUT_FILE = "Data/NOAA/Data/stations.json";
const fs = require("fs");

let stations = {};
let data = fs.readFileSync(STATION_RAW, "utf8");
data_sp = data.split("\n");
data_sp.forEach((elem) => {
    if (elem !== "") {
        let station = {
            location: {
                lat: Number.parseFloat(elem.substr(12, 8)),
                long: Number.parseFloat(elem.substr(21, 9)),
                elev: Number.parseFloat(elem.substr(31, 6)),
            },
            state: elem.substr(38, 2),
            name: elem.substr(41, 30).trim(),
            WMO_id:
                elem.substr(80, 5).trim() === ""
                    ? null
                    : elem.substr(80, 5).trim(),
        };
        stations[elem.substr(0, 11)] = station;
    }
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(stations), "utf8");
