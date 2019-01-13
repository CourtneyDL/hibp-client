const express = require('express');
const path = require('path');
const cors = require('cors');

const ApiClient = require('./lib/ApiClient');
const BreachClient = require('./lib/BreachClient');
const EmailCheckClient = require('./lib/EmailCheckClient');
const PasswordCheckClient = require('./lib/PasswordCheckClient');

const port = 4000;
const ui_directory = path.resolve(__dirname, '../ui/build');

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(cors());//Allows all requests
app.use('/', express.static(ui_directory));

app.post('/test', (req, res) => {
    try{
        const api_client = new ApiClient();
        res.json({
            success: true,
            request: req.body,
            result: api_client.complete(),
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.post('/search/email', async (req, res) => {
    try{
        const api_client = new EmailCheckClient(req.body.email_addresses);
        res.json(await api_client.complete());
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.post('/search/password', async (req, res) => {
    try{
        const api_client = new PasswordCheckClient(req.body.password);
        res.json(await api_client.complete());
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get('/breach/view/:name', async (req, res) => {
    try{
        const api_client = new BreachClient(req.params.name);
        const result = await api_client.complete();
        res.json({
            success: true,
            request: req.params.name,
            result,
        });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

//All GET requests load the react app unless otherwise specified
app.get('/*', (req, res) => {
    res.sendFile(path.join(ui_directory, 'index.html'));
});

server.listen(port, () => {
    console.log("Listening on port %s", port);
});