import express from 'express';
import { createAuthor, getAllAuthors, getAuthor, updateAuthor, removeAuthor } from '../controller/author'
import { checkPermission } from '../middleware/checkPermission';

const authorRouter = express.Router();
authorRouter.post('/author/add',checkPermission, createAuthor);
authorRouter.get('/author', getAllAuthors);
authorRouter.get('/author/:id', getAuthor);
authorRouter.put('/author/:id/update',checkPermission, updateAuthor);
authorRouter.delete('/author/:id',checkPermission, removeAuthor);
export default authorRouter;
