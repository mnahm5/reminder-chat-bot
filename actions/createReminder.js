'use strict';

const createReminder = (session, agenda) => {
    return ({sessionId, context, entities}) => {
        return new Promise((resolve, reject) => {
            // fetching and extract entities
            console.log(entities);
            // update context with task and time
            // call agenda to set a reminder
            // resolve with the updated context
            return resolve(context);
        });
    }
};

module.exports = createReminder;