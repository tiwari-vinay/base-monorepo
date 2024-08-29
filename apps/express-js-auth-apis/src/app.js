import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { userModel } from './model/user.js';

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ message: 'ok', users: [users] });
});
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY || 'this is secret to sign with'
    );
    return res.status(200).json({ message: 'ok', access_token: token });
  }

  return res.status(400).json({ message: 'invalid user/passwor ' });
});

app.post('/auth/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (
    !email ||
    typeof email != 'string' ||
    !password ||
    typeof password != 'string' ||
    !username
  )
    return res.status(400).json({ message: 'Invalid payload' });

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await userModel.create({
      email,
      username,
      password: encryptedPassword,
    });
    return res
      .status(201)
      .json({ message: { username: response.username, id: response._id } });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ message: 'Email or username already exists' });
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
