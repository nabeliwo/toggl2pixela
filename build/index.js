"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggl2pixela = void 0;
const toggl2pixela = (req, res) => {
    try {
        if (!req.body.temp) {
            throw 'Temperature is undefined';
        }
        if (req.body.temp < 100) {
            res.status(200).send('Temperature OK');
        }
        else {
            res.status(200).send('Too hot');
        }
    }
    catch (error) {
        //return an error
        console.log('got error: ', error);
        res.status(500).send(error);
    }
};
exports.toggl2pixela = toggl2pixela;
//# sourceMappingURL=index.js.map