// HWWWWWWWWWW HOME WORK HOME WORK

// make these secitons

// about: 1 short paragraph per page

// Servcies:
    // show at least 4 services per page

// Packages: Show at least 6 packages

// Gallery: 
    // show at least 16 image pe page









// imports express into our project
const express = require('express');

const app = express();

// specify static routes
app.use(express.static('public'));


// import a package for handlebars
const expressHandlebars = require('express-handlebars');

// make expresss use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',

})  );
app.set('view engine', 'handlebars');




const PORT = process.env.port || 3000;
console.log(process.env);

const gallery = require("./data/gallery.json");

// process routes
app.get('/', (request,response)=>{
    console.log(gallery);
    response.render('landing', {
        gallery,
        title: "Welcome",
        abstract: "MIami is de home papo",
        image: "mewomeow2.png"
    });
    
}  );
app.get('/about', (request,response)=>{
    
    response.render('about', {
        title: "About miamiiii",
        abstract: "so absically papo like miami si crazy i mean tremendo come pingas on the ride fr"
    });
}  );
app.get('/home', (request,response)=>{
    
    response.render('home');
}  );

app.get('/nightlife', (request,response)=>{
    
    response.render('page', {
        title: "Night Life",
        abstract: "so nightlife is way too expesncvie and is one big scam fr"
    });
}  );

app.get('/poopoo', (request,response)=>{
    
    response.render('page', {
        title: "Anotha new page",
        abstract: "so basically i show how i can just make a new page on the fly"
    });
}  );






// this one trigers a serve error------------//
app.get('/history', (req,res)=>{    //
                //
    response.send('Over hrer are hsitory')   //
}  );//--------------------------------------//





// Handle the error first

//NOT_FOUND      default response
app.use(  (request,response)=>{
    
    response.status(404);
    
    response.render('404');
}  );

//SERVER_ERROR
app.use(  (error,request,response,next)=>{
    console.log(error.message);
    
    response.status(500);

    response.render('500');
} );

app.listen(PORT,  ()=>{
    console.log(`Express is running on http://localhost:${PORT}`);
    console.log('Press ctrl-c to terminate');
}  );
