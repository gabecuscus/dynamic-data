// imports express into our project
const express = require('express');

const app = express();

// specify static routes
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
const handler = require('./lib/handler');

// import a package for handlebars
const expressHandlebars = require('express-handlebars');

// make expresss use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
})  );

app.set('view engine', 'handlebars');




const PORT = process.env.port || 3000;
console.log(process.env);
app.get("/",(req,res)=>{
    res.render('page', {req})
})

app.get('/newsletter-signup', handler.newsletterSignup);
app.post('/newsletter-signup/process', handler.newsletterSignupProccess);

app.get('/newsletter/list', handler.newsletterSignupList);

app.get('/newsletter/thank_you', handler.thankYouPage);

app.get('/newsletter/details/:email',handler.newsletterUser);

app.get('/newsletter/delete/:email',handler.newsletterUserDelete);


app.get("/mad",(req,res)=>{
    const data = require("./data/mad-data.json")
    res.render('madform', {data})
})


app.post('/process',(req,res)=>{
    res.send('got post')
})

app.get('/process',(req,res)=>{
    console.log(req.query)
})


app.get("/answers",(req,res)=>{
    const data = req.body;
    res.render('madResult', data);
})


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
