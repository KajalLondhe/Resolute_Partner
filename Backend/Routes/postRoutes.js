const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controlleres/postController');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), postController.createPost);
router.get('/', postController.getPosts);
router.put('/:id', upload.single('image'), postController.updatePost);
router.delete('/:id', postController.deletePost);

router.get('/edit/:id', postController.getPostById);

module.exports = router;
