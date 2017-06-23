'use strict';
const Agenda = require('agenda');
const {MONGO_URI} = require('../config');
const agenda = new Agenda({
    db: {
        address: MONGO_URI
    }
});

module.exports = (f) => {
    // define agenda jobs


    return agenda
};