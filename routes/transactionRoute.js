import express from 'express';
import { createTransaction, deleteTransaction, getSpecificTransaction, getTransaction, updateTransaction } from '../controller/transactionController.js';

const router = express.Router();

router.get('/list', getTransaction);
router.get('/list/:id', getSpecificTransaction);
router.post('/create', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

export default router;