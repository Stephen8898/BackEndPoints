const express = require("express");
const routes = express.Router();

const Comment = require("../models/Comment");

// routes.post('/reply/:comment_id/article/:article', (req, res) => {
//     const comment_id = {_id: req.params.comment_id};
//          new Comment({
//         article: req.params.article,
//         reply: comment_id,
//         name: req.body.name,
//         body: req.body.body,
//     }).save()
//     .then(reply => {
//         res.status(200).json({reply});
//     })
//     .catch(err => {
//         res.status(400).json({success: false, msg: err});
//     });

// });

// routes.get('/replys/:comment_id', (req,res) => {
//     const query = {reply: req.params.comment_id};
//     Comment.find(query)
//     .then(comments => {
//         res.status(200).json({comments});
//     })
//     .catch(err => {
//         res.status(400).json({success: false, msg: err});
//     })
// });

routes.post("/post_comment", (req, res) => {
  let comment = new Comment({
    article: req.body.article,
    name: req.body.name,
    body: req.body.body
  });
  comment
    .save()
    .then(comment => {
      res.status(200).json({ comment });
    })
    .catch(err => {
      res.status(400).json({ success: false, msg: err });
    });
});

routes.get("/get_comments/:article", (req, res) => {
  Comment.find({ article: req.params.article })
    .then(comments => {
      res.status(200).json({ comments });
    })
    .catch(err => {
      res.status(404).json({ err: err, msg: "No comments for this article" });
    });
});

// routes.delete('/delete_comment/:comment_id', (req, res) => {
//     Comment.findByIdAndDelete({_id: req.params.comment_id})
//     .then(resp => {
//         res.status(200).json({success: true, msg: 'Comment deleted'});
//     })
//     .catch(err => {
//         res.status(401).json({success: false, msg: err});
//     })
// });

module.exports = routes;
