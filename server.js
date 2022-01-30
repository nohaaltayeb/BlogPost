const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/articles');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//connect to mongo
mongoose.connect('mongodb://localhost/blog',
  {
    useNewUrlParser: true
  })

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.get('/', async (req,res)=>{
    const articles = await Article.find();
    res.render('articles/index', {articles:articles})

})
app.use('/articles',articleRouter);

app.listen(5000, ()=>{
    console.log('Server is Running On Port 5000')
})