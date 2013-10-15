/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

messageDatabase = require('./message-database.js');

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  if (request.method === "OPTIONS") {
    response.end();
  } else if (request.method === "GET") {
    data = JSON.stringify({results: messageDatabase.get()});
    response.end(data);
  } else if (request.method === "POST") {
    console.log(request);
    var message = "";
    request.addListener('data', function(chunk) {
      message += chunk;
    });
    request.addListener('end', function() {
      messageDatabase.add(JSON.parse(message));
      response.end();
    });
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.handleRequest = handleRequest;