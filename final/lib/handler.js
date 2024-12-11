// let eList = require('../data/emails.json');

const fs = require("fs");

////////////////
///////////////         GLOBAL OBJECTS
/////////////
const all_the_JSON = {
    "lexus": require('../data/lexus.json'),
    "toyota": require('../data/toyota.json'),
    "genesis": require('../data/genesis.json')
};

function getRandomCarsObject() {
    console.log("begin random car search");
    const selectedCars = {}; // Object to store 6 random cars
    const brands = Object.keys(all_the_JSON); // ['lexus', 'toyota', 'genesis']

    // Loop until we select 6 unique cars
    while (Object.keys(selectedCars).length < 6) {
        // Step 1: Roll dice to choose a random brand
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const cars = all_the_JSON[randomBrand].products;

        // Step 2: Roll dice to choose a random car from the selected brand
        const randomCar = cars[Math.floor(Math.random() * cars.length)];

        // Step 3: Add the car to the selectedCars object if it's not already included
        if (!selectedCars[randomCar.id]) {
            // Replace the category with the brand name
            selectedCars[randomCar.id] = {
                ...randomCar,
                category: randomBrand // Replace category with the brand name
            };
        }
    }

    console.log("the 6 cars!!:", selectedCars);
    return selectedCars; // Return an object with 6 unique cars
}
var shopping_cart = {
    /*"00": {
        id: 1,
        name: "2024 4Runner",
        price: 40705,
        category: "toyota",
        image: "/images/toyota/mains/toy1.png",
        details: [
            "16/19 EST. MPG",
            "ADVENTURE-READY DESIGN",
            "RUGGED BODY-ON-FRAME CONSTRUCTION"
        ],
        gallery: [
            "/images/toyota/gal/toy1_1.png",
            "/images/toyota/gal/toy1_2.png",
            "/images/toyota/gal/toy1_3.png",
            "/images/toyota/gal/toy1_4.png"
        ]
    },
    "001": {
        id: 2,
        name: "2024 Genesis G80",
        price: 54400,
        category: "genesis",
        image: "/images/genesis/mains/gen2.png",
        details: [
            "375-HORSEPOWER TURBO V6 ENGINE",
            "14.5-INCH TOUCHSCREEN DISPLAY",
            "LUXURIOUS WOOD-TRIMMED INTERIOR"
        ],
        gallery: [
            "/images/genesis/gal/gen2_1.png",
            "/images/genesis/gal/gen2_2.png",
            "/images/genesis/gal/gen2_3.png",
            "/images/genesis/gal/gen2_4.png"
        ]
    }*/
};
function calculateTotalPrice(cart) {
    let total = 0;

    // Iterate through the cart object
    for (const key in cart) {
        if (cart.hasOwnProperty(key)) {
            total += cart[key].price; // Add the price of each car
        }
    }

    return total; // Return the total price
}
///////////////
/////////////
///////////








exports.ren_lexus = (req,res)=> {
    const data = require('../data/lexus.json');

    res.render('category', {data, shopping_cart});
}

exports.ren_toyota = (req,res)=> {
    const data = require('../data/toyota.json');

    res.render('category', {data, shopping_cart});
}

exports.ren_genesis = (req,res)=> {
    const data = require('../data/genesis.json');

    res.render('category', {data, shopping_cart});
}


exports.ren_home = (req, res)=> {
    // all_the_JSON
    
    var sixRandomCars = getRandomCarsObject();
    res.render('home', {shopping_cart, sixRandomCars})
}


exports.ren_thank_you = (req,res)=> {
    
    var total_price = calculateTotalPrice(shopping_cart);


    res.render('thankYou', {total_price, perosnal_info});
}

exports.ren_lex_details = (req, res)=> {
    const data = require('../data/lexus.json');

    // console.log(data.id);
    console.log(data.company);
    console.log("imma take  a ");
    console.log(req.params.id);
    // console.log(data.products.)
    
    // appearntly find is faster than filter, because filter will return an array, find will do the first one and hten stop searching
    let current_car = data.products.find((prod)=> prod.id==req.params.id);

    // lesgoo it works!!!!!!!!
    console.log(current_car.name);

    //globals
    console.log("the shoping cart!!!");
    console.log(shopping_cart);
    var total_price = calculateTotalPrice(shopping_cart);
    var sixRandomCars = getRandomCarsObject();
    res.render('details', {current_car, sixRandomCars, shopping_cart, total_price});
} 
exports.ren_toy_details = (req, res)=> {
    const data = require('../data/toyota.json');
    let current_car = data.products.find((prod)=> prod.id==req.params.id);
    
    var sixRandomCars = getRandomCarsObject();
    var total_price = calculateTotalPrice(shopping_cart);
    res.render('details', {current_car, sixRandomCars, shopping_cart, total_price});
}
exports.ren_gen_details = (req, res)=> {
    const data = require('../data/genesis.json');
    let current_car = data.products.find((prod)=> prod.id==req.params.id);
    
    var sixRandomCars = getRandomCarsObject();
    var total_price = calculateTotalPrice(shopping_cart);
    res.render('details', {current_car, sixRandomCars, shopping_cart, total_price});
}


//cart    maybe.......
// var de_cart = {"products": []};
// shopping_cart
exports.ren_cart = (req, res)=> {
    if(typeof(req.query.id) != "undefiuned"){
        //if its not empty
        de_cart.products.push(req.query);
        } else {
            console.log(req.query.id);
        }
    console.log("DEEEE CARRRTTTTT");
    console.log(de_cart);
    res.render("cart", {de_cart});
}




let cartCounter = 0;
exports.updateCart = (req, res)=> {
    console.log(" infromation gathered!!!");
    console.log(req.body);
    
    
    // if category 1 then categoryString equals lexus
    // if categroy 2 then categoryString equals toyota
    // if categroy 3 then categoryString equals genesis
    // Step 1: Map category number to company name
    const categoryMap = {
        1: "lexus",
        2: "toyota",
        3: "genesis"
    };

    const companyName = categoryMap[req.body.category]; // Convert category to company name
    if (!companyName) {
        console.log("Invalid category received:", req.body.category);
        return res.status(400).send("Invalid category");
    }

    // let current_car = all_the_JSON.companyName.products.find((prod)=> prod.id==req.body.id);
    // const carsArray = all_the_JSON[companyName]?.products; // Get the array of products for the company
    // const current_car = carsArray.find(car => car.id == req.body.id); // Find the car by ID
    var current_car = all_the_JSON[companyName]?.products.find((prod) => prod.id == req.body.id);
    current_car.category = companyName;

    cartCounter++; 
    shopping_cart[String(cartCounter)] = current_car;
    console.log("the shopping cart after the push");
    console.log(shopping_cart);
    
    // res.redirect(req.get('referer'));
    res.redirect('back');

}
var perosnal_info = {};
exports.ren_checkOut = (req,res)=> {
    console.log(" shipping infromation gathered!!!");
    console.log(req.body);

    perosnal_info = req.body;
    res.redirect('/thank_you');

}





// ------------- EXPORTS page -----------------------

exports.ren_home = this.ren_home;

exports.ren_lexus = this.ren_lexus;
exports.ren_toyota = this.ren_toyota;
exports.ren_genesis = this.ren_genesis;

exports.ren_lex_details = this.ren_lex_details;
exports.ren_toy_details = this.ren_toy_details;
exports.ren_gen_details = this.ren_gen_details;

exports.ren_cart = this.ren_cart;//dont use this
exports.updateCart = this.updateCart;
exports.ren_checkOut = this.ren_checkOut;

exports.ren_thank_you = this.ren_thank_you;