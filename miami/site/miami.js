// imports express into our project
const express = require('express');

const app = express();




// import a package for handlebars
const expressHandlebars = require('express-handlebars');

// make expresss use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',

})  );
app.set('view engine', 'handlebars');




const PORT = process.env.port || 3000;
console.log(process.env);

// process routes
app.get('/', (request,response)=>{
    response.render('home');
    
}  );
app.get('/about', (request,response)=>{
    
    response.render('about');
}  );
app.get('/home', (request,response)=>{
    
    response.render('home');
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
