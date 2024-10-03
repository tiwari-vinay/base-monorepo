import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { UserModel } from './model/user.js';
import { TodoModel } from './model/todos.js';

mongoose.connect('mongodb+srv://itcgel:HO2SvVZMossUdMe6@cluster0.mximc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({ message: 'ok', users: [users] });
});
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

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
    const response = await UserModel.create({
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

//Todos
app.get('/todos', async (req, res) => {
  const todos = await TodoModel.find();
  res.status(200).json({ message: 'ok', todos: todos });
});

app.post('/todos', async (req, res) => {
  const { todoHead, todoBody } = req.body;

  // if (!todoHead) {
  //   return res.status(400).json({ message: 'Todo must have title' });
  // }

  try {
    const response = await TodoModel.create({
      todoHead,
      todoBody,
    });
    return res
     .status(201)
     .json({ message: { title: response.todoHead, id: response._id } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Failed to create todo' });
  }
});

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
