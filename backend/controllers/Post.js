const { json } = require("body-parser");
const Post = require("../models/Post");
const fs = require("fs");

exports.AllPosts = (req, res, next) => {
  Post.find()
    .then((Posts) => res.send(Posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.AddPost = (req, res, next) => {
  const { message } = req.body;
  const { userId, pseudo } = req.auth;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const newPost = new Post({
    userId,
    message,
    imageUrl: imageUrl,
    pseudo: pseudo,
  });
  newPost
    .save()
    .then((Post) => res.status(200).json({ message: "post envoyé" }))
    .catch((error) =>
      res.status(400).json({ message: "Erreur message", error: error })
    );
};

exports.PostId = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((Post) => {
      return res.status(200).json(Post);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.ModifyPost = (req, res, next) => {
  const { userId, isAdmin } = req.auth;
  const editPost = req.file
    ? {
        message: req.body.message,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { message: req.body.message };

  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.userId === userId || isAdmin === true) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              res
                .status(500)
                .json({ message: "erreur suppression image Post" });
            }
          });
        }
      })
      .catch((error) => res.status(400).json({ message: "erreur Post" }));
  }

  Post.updateOne({ _id: req.params.id }, { ...editPost })
    .then(() => res.status(200).json({ message: "Post modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  const { userId, isAdmin } = req.auth;

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === userId || isAdmin === true) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimée !" });
            })
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res
          .status(400)
          .json({ message: "L'utilisateur ne peu pas supprimer ce post" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: "error" });
    });
};

exports.likePost = (req, res, next) => {
  const userId = req.auth.userId;
  const { like } = req.body;

  Post.findOne({ _id: req.params.id })
    .then((PostLike) => {
      if (!PostLike.usersLiked.includes(userId) && like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "like ajouté !" }))
          .catch((error) => res.status(400).json({ message: "error" }));
      }

      if (PostLike.usersLiked.includes(userId) && like === 0) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: userId },
          }
        )
          .then(() => res.status(200).json({ message: "pas de like" }))
          .catch((error) => res.status(400).json({ message: "error" }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
