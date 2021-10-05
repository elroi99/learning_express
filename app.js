let express = require("express");
let app = express();

let port = "8080";

// configuring the static assets path
// app.use is a middleware fn. 
// at a high level, it essentially says, for every request to the 
// server, always run the function passed into app.use()
app.use(express.static("public"));

// ------------- defining middleware functions

// defining a custom middleware fn
// middleware fn's have access to request obj, response obj and the next() fn
const middlewareFunction = (req , res , next) => {
    // middleware code to run here
    console.log(`Request URL ${req.url}`)

    // move on to the next middleware fn or the route handler
    next();
}

app.listen(port , function(){
    console.log(`Server is listening to port ${port}`)
})

app.get("/" , (req , res) => {
    console.log(req.body)
    res.send("hello world");
})

app.get('/json' , (req , res) => {
    res.status(200).json({ "name" : "robbie"});
})

// we are passing middleware function as a callback fn, not calling it ourself. 
// one way to use a middleware function. the other way is app.use() if i'm not mistaken
app.get("/imf" , middlewareFunction , (req , res ) => {
    res.status(200).send("Demonstrated the middleware fn");
})



