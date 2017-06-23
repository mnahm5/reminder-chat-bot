'use strict';
const endConversation = require('./endConversation');

module.exports = (session, f) => {
    return {
        send(request, response) {
            const {sessionId, context, entities} = request;
            const {text} = response;
            return new Promise((resolve, reject) => {
                let {fbid} = session.get(sessionId);
                f.txt(fbid, text);
                return resolve();
            })
        },

        endConversation
    };
};