'use strict';
const AWS = require('aws-sdk');

class AWS_S3 {

    constructor () {
        this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
    }

    /**
     * R
     * @param bucketName
     */
    listObject (bucketName) {
        console.log('call list object');
        const params = {
            Bucket: bucketName
        };
        return new Promise((resolve, reject) => {
            this.s3.listObjects(params, (err, data) => {
                if (err) {
                    reject(err.stack)
                } else {
                    resolve(data.Contents);
                }
            });
        });

    }
}

module.exports = AWS_S3;





