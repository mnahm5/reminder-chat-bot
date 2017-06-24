'use strict';
const moment = require('moment');

module.exports = (agenda, f) => {
    return agenda.define('createReminder', job => {
        // extract fbid, datetime and take
        const {fbid, datetime, task} = job.attrs.data;

        // get the fb user's timezone
        f.getProfile(fbid)
            .then(profile => {
                const {first_name, timezone} = profile;
                const UTC_Offset = moment.utc(datetime).subtract(timezone, 'hours');
                const timeDiff = UTC_Offset.diff(moment.utc());
                const scheduleTime = (timezone <= 0 ? moment.utc(datetime) : UTC_Offset.toDate());
                agenda.schedule(scheduleTime, 'reminder', {
                    fbid,
                    first_name,
                    task
                })
            })
            .catch(error => console.log(error))

        // compute the offset
    });
};