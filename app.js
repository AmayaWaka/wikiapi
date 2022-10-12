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
.put(function(){});
app.delete("/articles",function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      console.log("Items deleted");
    }else{
      console.log("Unable to delete");
    }
  });

});


app.listen(3000, function(){
  console.log("Server started");
});
