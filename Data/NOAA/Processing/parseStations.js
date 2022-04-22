const OUTPUT_FILE = process.env.STATIONS_JSON;
const fs = require("fs");

let stations = [];
let data = fs.readFileSync(0, "utf8");
data_sp = data.split("\n");
data_sp.forEach((elem, i) => {
    if (elem !== "") {
        let station = {
            id: elem.substr(0, 11),
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
        stations.push(station);
    }
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(stations, null, 4), "utf8");
