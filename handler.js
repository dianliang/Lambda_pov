'use strict';

const MYSQL = require('./mysql-util');

module.exports.getShiftCoverage = (event, context, callback) => {
    console.log('start getShiftCoverage');
    let data = {};
    const mySQL = new MYSQL();

    mySQL.connect().then(() => {
        return mySQL.query('call tracker_brisbane_au.getShiftCoverage;');
    }).then((result) => {
        data = JSON.stringify(result[0][0]);
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: data,
        };
        mySQL.disconnect();
        callback(null, response);
    }).catch((err) => {
        mySQL.disconnect();
        let errResp = {err: err};
        const response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(errResp),
        };
        callback(null, response);
    });

};

// getShiftCoverage('','',function (a,res) {
//     console.log('res',res);
// });