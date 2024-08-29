// a JavaScript Object Notation      also known as JSON
var printer = {
    color:"black",
    size:"small",
    price:29.99
}




// create an object that is
const http = require('http');

//          if procces thang not there, use 3000        || is or
const PORT = process.env.PORT || 3000;



// .createserver()   takes a function as an agrmuent

// function handleRequest(request , response) {
//     response.writeHead( 200, {'Content-Type':'text/plain'});
//     response.end('Hello World');
// }

// create a server as a method of the http object
const server = http.createServer( (request, response) => {
    console.log(request);
    response.writeHead( 200, {'Content-Type':'text/plain'});
    response.end('Hello World');
});

// start the server
server.listen( PORT, ()=> console.log(`server started on port ${PORT}; ` + 'press Ctrl-C to terminate.....'));

// .listen() really just needs one argument, like PORT
// the second arguments is called a callback

