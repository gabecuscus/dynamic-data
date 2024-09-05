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
    console.log("****************************************");
    console.log("****************************************");
    
    console.log(request.url);
    console.log(request.method);


    // How to respond to requests
    //          other wise known as ROUTING
    if(request.url == "/"){
        response.writeHead( 200, {'Content-Type':'text/plain'});
        response.end('DE CUS CUS home pageeeeeee');
    
    } else if(request.url == "/contact"){
        response.writeHead( 200, {'Content-Type':'text/plain'});
        response.end("contact cus cus at 305 meow meow78");
    } else if( (request.url == "/gallery") || (request.url == "/about")){
        // lets out put html on dis one
        response.writeHead( 200, {'Content-Type':'text/HTML'});
        response.end("<html> <head> <title> De Page Titel </title>  </head> <body> <h1> my first HTML thanggg </h1> </body> </html>");
    } else {
        response.writeHead(400, {'Content-Type':'text/plain'});
        response.end("Page no found papo, error 400");
    }




    console.log("responding to request");

    console.log("****************************************");
    console.log("****************************************");
});

// start the server
server.listen( PORT, ()=> console.log(`server started on port http://localhost:${PORT}; ` + 'press Ctrl-C to terminate.....'));

// .listen() really just needs one argument, like PORT
// the second arguments is called a callback

