import express from 'express'
import { getAllUsers, deleteUser, updateUser, getUserById } from '../controller/users';

export default function users(router: express.Router){
    router.get("/users", getAllUsers);
    router.get("/user/:id", getUserById);
    router.put("/user:id", updateUser);
    router.delete("/user:id", deleteUser);
}