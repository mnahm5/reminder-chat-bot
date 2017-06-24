'use strict';

module.exports = (agenda, f) => {
    return agenda.define('createReminder', job => {
        // extract fbid, datetime and take
        const {fbid, datetime, task} = job.attrs.data;

    });
};