const myArgs = process.argv.slice(2);
const fs = require("fs");

if (myArgs.length < 2) {
    console.log("Usage: node parseStations.js input output");
    process.exit(1);
}

let stations = {};
let data = fs.readFileSync(myArgs[0], "utf8");
let OUTPUT_FILE = myArgs[1];
data_sp = data.split("\n");
data_sp.forEach((elem) => {
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
