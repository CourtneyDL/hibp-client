const express = require('express');
const path = require('path');
const cors = require('cors');

const ApiClient = require('./lib/ApiClient');

const port = 4000;
const ui_directory = path.resolve(__dirname, '../ui/build');

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(cors());//Allows all requests
app.use('/', express.static(ui_directory));

app.get('/*', (req, res) => {
    res.sendFile(path.join(ui_directory, 'index.html'));
});

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

server.listen(port, () => {
    console.log("Listening on port %s", port);
});