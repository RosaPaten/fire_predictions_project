const STATION_JSON = "Data/NOAA/Data/stations.json";
const RAW_DIR = "Data/NOAA/Data/raw";

try {
    fs.accessSync(RAW_DIR);
} catch (e) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
}

const fs = require("fs");
const https = require("https");
const { resolve } = require("path");
const { setTimeout } = require("timers");

const STATIONS = JSON.parse(fs.readFileSync(STATION_JSON));
const UNFULFILLED = STATIONS.filter((elem) => {
    return !fs.readdirSync(RAW_DIR).includes(elem.id + ".dly");
});

// const STATIONS = JSON.parse(fs.readFileSync("test.json"))

// const totalData = JSON.parse(fs.readFileSync(OUTPUT));

let data = [];

const sleep = (ms) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < ms);
};

for (const elem of UNFULFILLED) {
    console.log("test");
    data.push(
        new Promise((resolve, reject) => {
            https
                .get(
                    `https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/${elem.id}.dly`,
                    (res) => {
                        let error;
                        if (Math.floor(res.statusCode / 100) !== 2) {
                            error = new Error(
                                `Request to ${res.url} returned status ` +
                                    res.statusCode +
                                    ": " +
                                    res.statusMessage
                            );
                        } else if (
                            res.headers["content-type"] !== "text/plain"
                        ) {
                            error = new Error(
                                `Request to ${res.url} has invalid content type: expected 'text/plain' but got '${res.headers["content-type"]}'`
                            );
                        }
                        if (error) {
                            console.error(error);
                            res.resume();
                            reject(error + `\nID: ${elem.id}`);
                        }

                        res.setEncoding("utf8");
                        let rawData = "";
                        res.on("data", (chunk) => {
                            rawData += chunk;
                        }).on("end", () => {
                            // TODO: parse response
                            resolve({ data: rawData, id: elem.id });
                        });
                    }
                )
                .on("error", (err) => {
                    reject(err + `\nID: ${elem.id}`);
                });
        })
    );
}

let responses = [];

new Promise((res) => {
    let c = 0;
    data.forEach((elem, i) => {
        responses[i] = new Promise((res) => {
            elem.then((data) => {
                res({
                    status: "fulfilled",
                    data: data,
                    err: null,
                });
            }).catch((err) => {
                res({
                    status: "rejected",
                    data: null,
                    err: err,
                });
            });
        });
        sleep(100);
        console.log(i);
    });
    Promise.all(responses).then((responses) => res(responses));
}).then((array) => {
    const fulfilled = array.filter((val) => val.status === "fulfilled");
    const rejected = array.filter((val) => val.status === "rejected");
    console.log("Number fulfilled: " + fulfilled.length + "/" + array.length);
    fulfilled.forEach((elem) => {
        fs.writeFileSync(RAW_DIR + `/${elem.data.id}.dly`, elem.data.data);
    });
});
