
const http = require('http');

// de local file system
const fs = require('fs');


const PORT = process.env.PORT || 3000;

console.log("the __dirname: ", __dirname)

const displayPage = (path, res, contentType, responseCode = 200) => {
    fs.readFile(__dirname + path , (errors, content) => {
        if(errors){
            res.writeHead(500,{'{con}Content-type':'text/plain'});
            return res.end('500 - Internal Error');
        }
        res.writeHead(responseCode,{"Content-type" : contentType});
        res.end(content);
    });
};



// fs.readFile('urlthang/' , (errors, contnet) => {
//     if(errors){
//         response.writeHead(500, {'Content-type':'text/plain'})
//         return end('500 - Internal Error');
//     }
//     writeHead(200,{"Content-type" : "test/html"});
//     end(contnet);
// });



const server = http.createServer( (request, response) => {

    console.log(request.url);
    console.log(request.method);

    var path = request.url;

    switch(path) {
        case '':
        case '/':
            displayPage('/public/home.html',response, 'text/html');
            break;

        case '/about':
            displayPage('/public/about.html',response, 'text/html');
            break;

        case '/contact':
            displayPage('/public/contact.html',response, 'text/html');
            break;
        
        case '/cube':
            displayPage('/public/cube.html',response, 'text/html');
            break;
        case '/logo':
            displayPage('/public/fat_cat.jpg',response, 'iamge/jpg')
            break;
        default:
            displayPage('/public/404.html', response, 'text/html', 404);
            break;
    }

    

    console.log("responding to request");

});

// start the server
server.listen( PORT, ()=> console.log(`server started on port http://localhost:${PORT}; ` + 'press Ctrl-C to terminate.....'));
