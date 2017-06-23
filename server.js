'use strict';
const config = require('./config');
// create an API server
const Restify = require('restify');
const server = Restify.createServer({
    name: 'reminder-chat-bot'
});
const PORT = process.env.PORT || 3000;

// FBeamer
const FBeamer = require('./fbeamer');
const f = new FBeamer(config.FB);

server.use(Restify.jsonp());
server.use(Restify.bodyParser());
server.use((req, res, next) => f.verifySignature(req, res, next));

// Session
const session = require('./session');
// Actions
const actions = require('./actions')(session, f);

// WIT.AI
const Wit = require('node-wit').Wit;
const wit = new Wit({
    accessToken: config.WIT_ACCESS_TOKEN,
    actions: actions
});

// Register the webhooks
server.get('/', (req, res, next) => {
    f.registerHook(req, res);
    return next();
});

// Handle incoming
server.post('/', (req, res, next) => {
    f.incoming(req, res, msg => {
        const {
            sender,
            postback,
            message
        } = msg;

        if(message.text) {
            // Process the message here
            console.log(message.text);
            f.txt(sender, `You said ${message.text}`);
        }

    });

    return next();
});

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Bot running on port ${PORT}`));

