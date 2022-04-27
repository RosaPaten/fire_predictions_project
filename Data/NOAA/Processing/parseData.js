const fs = require("fs");
const { stdout } = require("process");

const INPUT_DIR = "Data/NOAA/Data/raw";
const OUTPUT_DIR = "Data/NOAA/Data/parsed";

let parsedObj = {};

fs.readdirSync(INPUT_DIR, "utf8").map((data) => {
    let file = fs.readFileSync(INPUT_DIR + "\\" + data, "utf8");
    file.split("\n").forEach((line) => {
        if (line !== "") {
            const element = line.substr(17, 4);
            if (!parsedObj[element]) {
                parsedObj[element] = "";
            }
            parsedObj[element] += line + "\n";
        }
    });
});

try {
    fs.accessSync(OUTPUT_DIR);
} catch (e) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

Object.keys(parsedObj).forEach((elem) => {
    fs.writeFileSync(
        OUTPUT_DIR + "/" + elem + ".dly",
        parsedObj[elem],
        "ascii"
    );
});
