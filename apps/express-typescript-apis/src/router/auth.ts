import express from 'express';

import { login, register } from '../controller/auth';

export default function auth(router: express.Router) {
  router.post('/auth/login', login);
  router.post('/auth/register', register);
}
