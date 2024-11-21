let eList = require('../data/emails.json');

const fs = require("fs");

exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', {csrf : 'supersecret'});
}

exports.newsletterSignupProccess = (req, response)=>{
    console.log(req.body);
    var newUser = {
        'firstname' : req.body.firstname,
       'lastname' : req.body.lastname,
       'address':req.body.address,
       'city':req.body.city,
       'state':req.body.state,
       'zip':req.body.zip,
       'email' : req.body.email
    }
    console.log("cleanred user");
    console.log(newUser);
    // once we have a clean user, we add it to the eList
    eList.users.push(newUser);
    console.log("current eList");
    console.log(eList);


    var json = JSON.stringify(eList);
    console.log(json);
    fs.writeFileSync('./data/emails.json', json, 'utf8', ()=>{} );

    response.redirect(303, '/newsletter/thank_you');
}


exports.thankYouPage = (req, res)=> {
    // to do pass in the user name
    res.render('thankyou');
}

exports.newsletterSignupList = (req, res) => {
    console.log(eList);
    res.render('userspage', { "users": eList.users});
}

exports.newsletterUser = (req, res)=> {
    var userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
     })

    res.render('userdetails', {"users": userDetails});
}
exports.newsletterUserDelete = (req, res) => {
    var newList = { users: []};
    newList.users = eList.users.filter((user) => {
        return user.email != req.params.email;
    });

    console.log("deleting: " + req.params.email);

    var json = JSON.stringify(newList);

    console.log(json);

    fs.writeFile('./data/emails.json', json, 'utf8', () => {});

    // res.send('<a href="/newsletter/list">Go Back</a>');
    eList = require('../data/emails.json');
    res.render('userspage', { "users": eList.users});
};



// export your function
exports.newsletterSignup = this.newsletterSignup;
exports.newsletterSignupProccess = this.newsletterSignupProccess;
exports.newsletterSignupList = this.newsletterSignupList;
exports.thankYouPage = this.thankYouPage;
exports.newsletterUser = this.newsletterUser;
exports.newsletterUserDelete = this.newsletterUserDelete;