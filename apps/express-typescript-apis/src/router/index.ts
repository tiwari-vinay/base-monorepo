import express, { Request, Response } from 'express';
import auth from './auth';
import users from './users';

const router = express.Router();
auth(router)
users(router)
export default router;