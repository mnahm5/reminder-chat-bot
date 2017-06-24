'use strict';
const Agenda = require('agenda');
const {MONGO_URI} = require('../config');
const agenda = new Agenda({
    db: {
        address: MONGO_URI
    }
});
const createReminder = require('./createReminder');
module.exports = (f) => {
    // define agenda jobs

    // display a reminder
    agenda.define('reminder', job => {
        const {fbid, first_name, task} = job.attrs.data;
        f.txt(fbid, `Hey ${first_name}! Reminding you to ${task}`)
    });

    //create reminder
    createReminder(agenda, f);

    return agenda
};