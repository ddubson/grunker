"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OpenDataRepository_1 = require("./OpenDataRepository");
var openDataRepository = OpenDataRepository_1.newOpenDataRepository(OpenDataRepository_1.pgPool());
exports.router = function (app) {
    app.get("/grunker/api/nyc311", function (req, res) {
        console.log("Fetching NYC OpenData records @ " + Date.now());
        openDataRepository.fetchFirstFiveRecords(function (items) {
            res.json(items);
            console.log("Finished fetching NYC OpenData records.");
        });
    });
};
