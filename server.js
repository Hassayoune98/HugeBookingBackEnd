require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/admin', require('./admin/admin.controller'));
app.use('/sender', require('./mailer/mailer.controller'));
app.use('/service', require('./services/service.controller'));
app.use('/VoitureOptionService', require('./voitureOptionService/voitureOptionService.controller'));
app.use('/chambreOptionService', require('./chambreOptionService/chambreOptionService.controller'));
app.use('/VoyageOptionService',require('./voyageOptionService/voyageOptionService.controller'));
//app.use('/ReservationService',require('./ReservationService/reservation.controller'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
console.log("server running");