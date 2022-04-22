const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");
// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
// chain in the add reply method
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment); // you need to to know the pizze that was commented on and the id of the comment

// separate route because we need the id of the specific reply to be deleted
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
