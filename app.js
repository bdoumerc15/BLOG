//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import truncate from "truncate";
import _ from "lodash";
import { separarConGuion } from './public/javascript/guiones.js';
import { title, currentDate } from "./public/javascript/home.js"
import ejs from "ejs";

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let postName = null;
const posts = [];

// ***********************GET************************
app.get('/', (req, res) => {
    res.render('home', { ejsContent: homeStartingContent, posts: posts, ejsDate: currentDate });

    // console.log(currentDate);
});


app.get('/about', (req, res) => {
    res.render('about', { ejsAbout: 'About', ejsAboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
    res.render('contact', { ejsContact: 'Contact', ejsContactContent: contactContent });
});

app.get("/compose", (req, res) => res.render('compose'));

app.get("/posts", (req, res) => {
    res.render('posts', { posts: posts });
});

app.get('/posts/:postName', (req, res) => {
    postName = req.params.postName;
    const arr = posts.some(post => separarConGuion(post.title) === separarConGuion(postName));
    const output = arr ? 'Sitio Encontrado' : 'Sitio No Encontrado';
    console.log(`${postName} - ${output}`);
});

app.get('/post/:postName', (req, res) => {
    postName = req.params.postName;
    res.render('post', { posts: posts, postName: postName, post: postName });
});

// ***************************POST*************************
app.post('/compose', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

// *****************************Listen****************************
app.listen(3000, function() {
    console.log("Server started on port 3000");
});