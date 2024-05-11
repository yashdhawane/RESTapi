const express = require("express")
const app = express()
const port =3000
const path = require("path")
const {v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.listen(port,()=>{
    console.log("listining to port:3000")
})

let posts=[
    {   
        id:uuidv4(),
        username:"apna",
        content:"code",

    },
    {
        id:uuidv4(),
        username:"apna",
        content:"code",

    },
    {
        id:uuidv4(),
        username:"apna",
        content:"code",

    },
]
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{
    console.log(req.body);
    // let {username,content}=req.body;
    // posts.push(username,content)
    const { username, content } = req.body;
    let id=uuidv4()
    // Add the new post to the posts array
    posts.push({ id,username, content });
    res.redirect("/");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log("Requested ID:", id);
    let post = posts.find((p) => {
        console.log("Post ID:", p.id, "Type:", typeof p.id);
        console.log("Comparison:", p.id == id);
        return p.id == id;
    });
    console.log("Found Post:", post);
    res.render("show.ejs",{post})
});

app.patch("/post/:id",(req,res)=>{
    let { id }=req.params
    let newcontent =req.body.content
    let post = posts.find((p)=>id===p.id);
    post.content =newcontent
    console.log(post);
    res.redirect("/")

})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let { id }=req.params;
    posts =posts.filter((p)=> id !== p.id);
    res.redirect("/")
})