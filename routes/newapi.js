const express = require('express');
const route = express.Router();
const axios = require('axios');

route.get('/news/:apiKey', (req, res) =>{ 
    axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
            country: 'us',
            apiKey: req.params.apiKey
        }
    })
     .then(response => {
         let result = response.data.articles.map(article => ({
                author: article.author,
                title: article.title,
                description: article.description,
                source: article.source.name,
                siteLink: article.url,
                image: article.urlToImage
         }))
       res.json({result});
    })

    .catch(error =>{
        res.json(error);
    })
  
});


route.get('/news/search/:apiKey', (req, res) =>{
    axios.get(`https://newsapi.org/v2/top-headlines?q=${req.query.q}&language=en&apiKey=${req.params.apiKey}`)
        .then(response => {
            let result = response.data.articles.map(article => ({
                author: article.author,
                title: article.title,
                description: article.description,
                source: article.source.name,
                siteLink: article.url,
                image: article.urlToImage,
                datePublished: article.publishedAt,
                content: article.content
        }))
  res.json({result});
})

.catch(error =>{
    res.json(error);
})
});

module.exports = route;