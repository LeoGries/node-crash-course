const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

// express app

const app = express();

// contect to MongoDB
const dbURI = 'mongodb+srv://ninja:test1234@nodetuts.enoq0.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

    // listen for requests
//app.listen(3000);
/*
app.use((req,res, next) =>{
    console.log("new request made:");
    console.log('host:', req.path);
    console.log('path', req.path);
    console.log('method: ', req.method);
    next();
})

app.use((req,res, next) =>{
    console.log("in the next middleware");
    next();
})
*/

//register view engine
app.set('view engine', 'ejs');
// if views are in other folder than views: app.set('views', 'myviews')


// middleware & static files

app.use(express.static('public'));
app.use(express.urlencoded( {extended: true })); //for posting blogs
app.use(morgan('dev'));

/*
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new 2 blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req,res) => {
    Blog.findById('60d30e16af9ca5157410fef8')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err)
        })
})
*/

app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname});
    /*const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: 'Home', blogs });  
    */
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname});
    res.render('about',  { title: 'About' })
});

//blog routes
app.use('/blogs', blogRoutes);

// redirects
/*
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});
*/

// 404 page //has to be at the bottom
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname})
    res.status(404).render('404',  { title: '404' });
});