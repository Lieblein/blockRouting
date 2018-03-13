import express from 'express';

import helpers from '../../webpack-config/helpers';
import routes from '../../src/constants/routes';

const app = express();

app.get('/', function(req, res) {
    res.sendFile(helpers.root('/build/index.html'));
});

app.use(`/${routes.BASE_URL}`, express.static(helpers.root('/build')));

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});
