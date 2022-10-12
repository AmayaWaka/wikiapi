const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
mongoose.connect('mongodb://localhost:27017/blogDB');

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));

const articlesSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("article", articlesSchema);

// const newArticle = new Article ({
//   title: "John",
//   content: "About john"
// });
// newArticle.save(function(err){
//   if(!err){
//     console.log("Article inserted successfuly");
//   }else{
//     console.log(err);
//   }
// });
app.use(express.static("public"));
//Targeting all articles
app.route('/articles')
.get(function(req, res){

  Article.find(function(err, foundArticles){
    res.send(foundArticles);
  });
})
.post(function(req, res){
    const newBlog = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newBlog.save(function(err){
      if(!err){
        res.send("Inserted successfuly");
      }else{
        res.send(err);
      }
    });
})
.put(function(){

})
.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfuly deleted all articles");
    }else{
      res.send(err);
    }
  });
});
//Targeting specific articles
//Getting a specific article
app.route('/articles/:articleTitle')
.get(function(req, res){
  Articles.findOne({title: req.params.articleTitle}, function(err,foundItem){
    if(!err){
      res.send(foundItem);
    }else{
      res.send(err);
    }
  });

})
.post(function(req, res){

})
.put(function(req, res){

})
.delete(function(req, res){

});

app.listen(3000, function(){
  console.log("Server started");
});
