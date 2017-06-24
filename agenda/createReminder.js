'use strict';

module.exports = (agenda, f) => {
    return agenda.define('createReminder', job => {
        // extract fbid, datetime and take
        const {fbid, datetime, task} = job.attrs.data;

        // get the fb user's timezone
        f.getProfile(fbid)
            .then(profile => {
                const {first_name, timezone} = profile;
            })
            .catch(error => console.log(error))

        // compute the offset
    });
};