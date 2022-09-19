const { json } = require("body-parser");
const Post = require("../models/Post");
const fs = require("fs");

exports.AllPosts = (req, res, next) => {
  Post.find()
    .then((Posts) => res.send(Posts))
    .catch((error) => res.status(403).json({ error }));
};

exports.AddPost = (req, res, next) => {
  const Post = JSON.parse(req.body.Post);
  const newPost = new Post({
    ...Post,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  newPost
    .save()
    .then((Post) => res.status(200).json({ message: "ok" }))
    .catch((error) => res.status(403).json({ message: "Problème" }));
};

exports.PostId = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((Post) => {
      return res.status(200).json(Post);
    })
    .catch((error) => res.status(403).json({ error }));
};

exports.ModifyPost = (req, res, next) => {
  const editPost = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((imgObjet) => {
        const filename = imgObjet.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => res.status(403).json({ message: "error Post" }));
  }
  //S'il y a une image a modifier / Supprimer l'ancienne image
  // -Connaitre l'ancienne image?
  //Supprimer cette image (Plugin NPM FS)
  //UpdateOne Post

  Post.updateOne({ _id: req.params.id }, { ...editPost, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifiée !" }))
    .catch((error) => res.status(403).json({ error }));
};

exports.deletePost = (req, res, next) => {
  //Supprimer l'image
  // -Trouver l'image
  // -Supprimer l'image (fs)
  // -Delete Post

  Post.findOne({ _id: req.params.id })
    .then((imgObjet) => {
      const filename = imgObjet.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Post supprimée !" });
          })
          .catch((error) => res.status(403).json({ error }));
      });
    })
    .catch((error) => {
      res.status(403).json({ message: "error" });
    });
};

exports.likePost = (req, res, next) => {
  const { like, userId } = req.body;

  Posts.findOne({ _id: req.params.id })
    .then((PostLike) => {
      if (!PostLike.usersLiked.includes(userId) && like === 1) {
        Posts.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "like ajouté !" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (PostLike.usersLiked.includes(userId) && like === 0) {
        Posts.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "pas de like" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (!PostLike.usersDisliked.includes(userId) && like === -1) {
        Posts.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "dislike ajouté" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }

      if (PostLike.usersDisliked.includes(userId) && like === 0) {
        Posts.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "pas de dislike" }))
          .catch((error) => res.status(403).json({ message: "error" }));
      }
    })
    .catch((error) => res.status(403).json({ error }));
};
