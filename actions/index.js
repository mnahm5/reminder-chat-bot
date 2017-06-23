'use strict';

module.exports = (session, f) => {
    const actions = {
        send(request, response) {
            const {sessionId, context, entities} = request;
            const {text} = response;
            return new Promise((resolve, reject) => {
                let {fbid} = session.get(sessionId);
                f.txt(fbid, text);
                return resolve();
            })
        }
    };

    return actions
};