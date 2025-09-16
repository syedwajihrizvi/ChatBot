const express = require('express');

const { chatController } = require('./controllers/chatController');

const router = express.Router();

router.post('/', chatController.sendMessage);

export default router;
