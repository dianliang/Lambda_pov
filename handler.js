'use strict';

const MYSQL = require('./mysql-util');
const AWS_S3 = require('./s3-service');
module.exports.getShiftCoverage = (event, context, callback) => {
    console.log('start getShiftCoverage');
    let data = {};
    const mySQL = new MYSQL();

    mySQL.connect().then(() => {
        return mySQL.query('call tracker_brisbane_au.getShiftCoverage;');
        // return mySQL.query('select * from tracker_brisbane_au.form');
    }).then((result) => {
        data = JSON.stringify(result[0][0]);
        // data = JSON.stringify(result);
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


module.exports.getS3ObjectList = (event, context, callback) => {
    const aws_s3_service = new AWS_S3();
    console.log('getS3List:: started');
    aws_s3_service.listObject('upload-lq-bucket').then((list) => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(list),
        };
        callback(null, response);
    }).catch((err) => {
        const errObj = {err: err};
        const response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify(errObj),
        };
        callback(null, response);
    });

};

// getShiftCoverage('','',function (a,res) {
//     console.log('res',res);
// });
