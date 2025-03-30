// import {parse} from "csv-parse/sync"
import { parse } from "fast-csv";
import * as fs from "fs";
import csvtojson from "convert-csv-to-json";

export const readStoredData = async () => {
    let i = 0;
    return new Promise((resolve, reject) => {
        let output = [];
        fs.createReadStream("public/data/combined.csv")
            .pipe(parse())
            .on("error", (error) => {
                console.error(error);
                reject();
            })
            .on("data", (row) => {
                if (i == 0) console.log(row[0]);
                output.push(row);
                i++;
            })
            .on("end", (rowCount: number) => {
                console.log(`Parsed ${rowCount} rows`);
                resolve(output);
            });
    });
};

export const readStoredCSVtoJSON = () => {
    let json = csvtojson
        .fieldDelimiter(",")
        .getJsonFromCsv("public/data/combined.csv");
    return json;
};

export const extractCO2 = () => {
    const data = readStoredCSVtoJSON();
    return data;
};

export const sensorLocations = [
    { name: "Berth 5", id: "1D95D8", lat: "50.8136430", lng: "-1.0928250" },
    { name: "MEGCP", id: "1D8BC5", lat: "50.8106950", lng: "-1.0875830" },
    { name: "SG", id: "1D92BC", lat: "50.8123330", lng: "-1.0866120" },
    { name: "Berth 4", id: "18E141", lat: "50.8112080", lng: "-1.0968130" },
    { name: "Berth 2", id: "1D1CF5", lat: "50.8113134", lng: "-1.0945468" },
];
