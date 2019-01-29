/** 
 * This is the primary file for the entire API
 */

//the necessary dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

//create an http server
var httpServer = http.createServer(function(req, res) {
    appServer(req, res);
});

//instantiate the http server
httpServer.listen(config.port, function() {
    console.log(`The server is listening on port ${config.port}`);
});

//Create the method for handling the requests
var appServer = function(req, res) {
    //parse the url for the request
    let parsedURL = url.parse(req.url, true);

    //get the path for the request
    let path = parsedURL.pathname;
    let cleanPath = path.replace(/^\/+|\/+$/g, '');

    //get the path from the parsed url
    let requestPath = parsedURL.pathname;

    //get the query string as an object
    let queryStringObject = parsedURL.query;

    //get the http method which is called
    let method = req.method.toLowerCase();

    //the headers for the request
    let headers = req.headers;

    //get the payload, if there is any
    let decoder = new StringDecoder('utf-8');
    let payload = '';
    req.on('data', function(data) {
        payload += decoder.write(data);
    });

    req.on('end', function() {
        payload += decoder.end();

        //choose the handler for the endpoint. If the route is non existent, fallback to the notFound handler
        var chosenHandler = typeof(router[cleanPath]) !== 'undefined' ? router[cleanPath] : handlers.notFound;

        //construct the data object to send to the handler
        var data = {
            'path': cleanPath,
            'queryString': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': payload
        };

        //construct the data object to send to the handler
        chosenHandler(data, function(statusCode, payload) {
            //convert the payload to a string
            let payloadString = JSON.stringify(payload);

            //return the response
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

//define the handlers for the endpoint/s
var handlers = {};

//hello world handler
handlers.greeting = function(data, callback) {
    callback(200, 'Hi there! Greetings from this Nodejs homework!');
}

//default handler
handlers.notFound = function(data, callback) {
    callback(404, `I'm still going to greet you...strange visitor! :-)`);
}

//the router is used for handling more requests
var router = {
    'greeting': handlers.greeting
}
