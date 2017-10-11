'use strict';

const jetpack = require('fs-jetpack'),
    VARS = require('./dir-vars'),
    path = require('path'),
    chalk = require('chalk'),
    jsDirs = VARS.jsDirs;

function pugFileArr() {
    return new Promise((resolve, reject) => {
        jetpack.findAsync(path.join(__dirname, '..', VARS.app, VARS.templates), {matching: ['*.pug']}).then(data => {
            resolve(data);
        }).catch((resolve, reject) => {
            reject()
        });
    });
}

function jsFileArr() {
    var promises = []
    for (var i = 0; i < jsDirs.length; i++) {
        promises.push(new Promise((resolve, reject) => {
            jetpack.findAsync(path.join(__dirname, '..', VARS.app, VARS.js, jsDirs[i]), {matching: ['*.js', path.join('**', '*.js'), '!*.spec.js', '!*.json', '!vendor/*.js']}).then(data => {
                resolve(data);
            }).catch((resolve, reject) => {
                reject();
            });
        }));
    }
    return Promise.all(promises).then(values => {
        return [].concat.apply([], values);
    }).catch(reason => {
        throw chalk.red(reason);
    });
}

function sassFileArr() {
    return new Promise((resolve, reject) => {
        jetpack.findAsync(path.join(__dirname, '..', VARS.app, VARS.style), {matching: '*.scss'}).then(data => {
            resolve(data);
        }).catch((resolve, reject) => {
            reject()
        });
    });
}

module.exports.pugFileArr = pugFileArr;
module.exports.jsFileArr = jsFileArr;
module.exports.sassFileArr = sassFileArr;