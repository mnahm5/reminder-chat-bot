'use strict';

const moment = require('moment');

module.exports = (agenda, f) => {
    return agenda.define('showReminders', job => {
        let {fbid} = job.attrs.data;
        agenda.jobs({
            name: 'reminder',
            'data.fbid': fbid,
            'nextRunAt': {
                $exists: true,
                $ne: null
            }
        }, (error, data) => {
            if (data.length === 0) {
                f.txt(fbid, "You have nothing to do. :)")
            }
            else {
                data.forEach(item => {
                    let {_id, nextRunAt} = item.attrs;
                    let {task} = item.attrs.data;

                    let rightNowUTC = moment.utc();
                    let runDate = moment.utc(nextRunAt);
                    let timeToEvent = rightNowUTC.to(runDate);

                    f.txt(fbid, `${task.charAt(0).toUpperCase() + task.slice(1)} is due ${timeToEvent}`);
                })
            }
        });
    })
};