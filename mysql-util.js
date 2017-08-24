'use strict';
const mysql = require('mysql');
const MySQL_URL = 'aeroascent.ctsobuno4cjk.ap-southeast-2.rds.amazonaws.com';

class MySQL {

    constructor () {
        this.connection = mysql.createConnection({
            host: MySQL_URL,
            user: 'admin',
            password: 'Password1'
        });
    }

    connect () {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    reject(err);
                } else {
                    console.log('connected as id ' + this.connection.threadId);
                    resolve(this.connection)
                }
            });
        });
    }

    query (queryStr) {
        return new Promise((resolve, reject) => {
            this.connection.query(queryStr, (err, result) => {
                if (err) {
                    console.error('error : ' + err);
                    reject();
                } else {
                    resolve(result);
                }
            })
        })
    }

    disconnect () {
        if (this.connection) {
            this.connection.destroy();
        }
    }
}

module.exports = MySQL;