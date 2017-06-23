'use strict';
const {fetchEntity} = require('../utils');

const createReminder = (session, agenda) => {
    return ({sessionId, context, entities}) => {
        return new Promise((resolve, reject) => {

            // fetching and extract entities
            let task = fetchEntity(entities, 'task');
            let datetime = fetchEntity(entities, 'datetime');
            console.log(`${task} at ${datetime}`);
            // update context with task and time
            // call agenda to set a reminder
            // resolve with the updated context
            return resolve(context);
        });
    }
};

module.exports = createReminder;