let express = require("express");
let app = express();

let port = "8080";

// configuring the static assets path
// app.use is a middleware fn. 
// at a high level, it essentially says, for every request to the 
// server, always run the function passed into app.use()
app.use(express.static("public"));

// make sure you add the middleware function fore each data type that you expect to receive in your request bodies 
// all the available functions are in express docs ofc ( API Reference > express() )
// the two lines below have replaced the body-parser npm package. These are actually based on body-parser itself. They come built into express by default
app.use(express.urlencoded({extended : true})); 
app.use(express.json());
app.use(express.text());

// ------------- defining custom middleware functions

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
// one way to use a middleware function. the other way is app.use() if i'm not mistaken. using it in this way will apply it on all requests.
// this middleware fn will only run on this route. 

app.get("/imf" , middlewareFunction , (req , res ) => {
    res.status(200).send("Demonstrated the middleware fn");
})

app.post("/" , (req , res) => {
    console.log(req.body);
    res.send(req.body);
})



