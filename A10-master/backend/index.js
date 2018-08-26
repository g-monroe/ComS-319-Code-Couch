import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import loginUser from './src/loginUser';
import registerUser from './src/registerUser';
import submitStory from './src/submitStory';
import addUserToProj from './src/addUserAndProject';
import fetchCards from './src/fetchCards';

// Constants
const PORT = process.env.EXPRESS_PORT;
const HOST = process.env.EXPRESS_HOST;

// App
const app = express();

app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.post('/UserAdd', (request, response) => {
    const responseInfo = addUserToProj(request.body);
    responseInfo.then(promise => {
		return promise;
    }).then(payload => {
        response.status(payload.status).json(payload.body);
		response.status(200).end();
    });
});

app.post('/login', (request, response) => {
    const responseInfo = loginUser(request.body);
    responseInfo.then(promise => {
        return promise;
    }).then(payload => {
        response.status(payload.status).json(payload.body);
    });
});

app.post('/signup', (request, response) => {
    const responseInfo = registerUser(request.body);
    responseInfo.then(promise => {
        return promise;
    }).then(payload => {
        response.status(payload.status).json(payload.body);
    });
});

app.post('/submitStory', (request, response) => {
    const responseInfo = submitStory(request.body);
    responseInfo.then(promise => {
        return promise;
    }).then(payload => {
        response.status(payload.status).json(payload.body);
    });
});

app.get('/fetchCards', (request, response) => {
    const responseInfo = fetchCards();
    responseInfo.then(promise => {
        return promise;
    }).then(payload => {
        response.status(payload.status).json(payload.body);
    });
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
