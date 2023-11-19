import express from 'express';
import { createComment, getAllComment, getComment, updateComment, removeComment } from '../controller/comment'
import { checkPermission } from '../middleware/checkPermission';

const commentRouter = express.Router();

commentRouter.post('/comment/add', createComment);
commentRouter.get('/comment', getAllComment);
commentRouter.get('/comment/:id', getComment);
commentRouter.put('/comment/:id/update', updateComment);
commentRouter.delete('/comment/:id',checkPermission, removeComment);

export default commentRouter;
