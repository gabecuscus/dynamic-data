// run the following cmmands in terminal

// sudo npm install express
// sudo npm install express-handlebars



// imports express into our project
const express = require('express');

const app = express();

// specify static routes
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json()); // Parses JSON data
const handler = require('./lib/handler');

// import a package for handlebars
const expressHandlebars = require('express-handlebars');

// make expresss use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
})  );

// app.set('view engine', 'handlebars');

// add the comma money thing
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    helpers: {
        formatPrice: function (price) {
            return price.toLocaleString('en-US'); // Formats with commas
        },
    },
});

// Set up Handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



const PORT = process.env.port || 3000;
console.log(process.env);







// render home page
app.get("/",(req,res)=>{
    const data = require('./data/homepage.json')
    res.render('page', {data})
})

// render about page
// app.get("/about",(req,res)=>{
//     const about = require('./data/about.json')
//     res.render('homepage', {about})
// })
app.get("/home", handler.ren_home);



// render category 1 page
app.get("/category1",(req,res)=>{
    const aboutBlue = require('./data/blueCars.json')
    res.render('category', {aboutBlue})
})


// redner category 1 page   lexus
app.get('/lexus/cat', handler.ren_lexus);
// render category 2 page    toyota
app.get('/toyota/cat', handler.ren_toyota);
// render category 3 page    genesis
app.get('/genesis/cat', handler.ren_genesis);

// details
app.get('/lexus/details/:id', handler.ren_lex_details);
app.get('/toyota/details/:id', handler.ren_toy_details);
app.get('/genesis/details/:id', handler.ren_gen_details);











app.get('/', (req, res) => {
    res.render('newsletter-signup', {csrf : 'supersecret'});
    // i think i might ahve an erorr here triny to render newsleter-signup
    // this might be why i cant press add to cart two times in a row
});
app.post('/process', handler.updateCart); // logner link


app.get('/checkout', (req,res)=> {
    res.render('checkOut', {csrf : 'supersecret'});
})
app.post('/checkout/process', handler.ren_checkOut);

app.get('/thank_you', handler.ren_thank_you);



// details page reference
app.get("/category1/details/:id",(req,res)=>{
    const data = require('./data/blueCars.json')
    // filter it to get only the data that atches the id

    var tempData = {"products":[]}

    data.products = data.products.filter((product)=>{
        return product.id == req.params.id
     })

    res.render('details', {data})
})





// cart    Jattin style
let cart = {"products":[]}
// !!!!!!!!!
app.get("/cart",(req,res)=>{
    // we need to populate cart 
    // every time we click add to cart
    if(typeof(req.query.id) != "undefiuned"){
        //if its not empty
        cart.products.push(req.query)
    } else {
        console.log(req.query.id)
    }
    res.render("cart",{"products":cart.products})
})
app.get("/carto", (req,res)=> {

})











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
