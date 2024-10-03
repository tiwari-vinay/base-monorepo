import User from './user.interface';
import userModel from './user.model'
import { Request, Response, NextFunction, Router } from 'express'

class UserService {
    public async getUserById(id: string): Promise<any> {
        // Implement your logic to fetch user by ID from the database or any other data source
        // For example, using Mongoose:
        return await userModel.findById(id);
        // Or using a simple array:

        // return users.find(user => user.id === id);
        // return null; // Replace with your actual implementation
    }

    public async createUser(user: any): Promise<any> {
        // Implement your logic to create a new user in the database or any other data source
        // For example, using Mongoose:
        console.log("control reached user service");
        
        return await userModel.create(user);
        // return null; // Replace with your actual implementation
    }

    public async updateUser(id: string, user: User): Promise<any> {
        // Implement your logic to update a user in the database or any other data source
        // For example, using Mongoose:
        return await userModel.findByIdAndUpdate(id, user, { new: true });
        // return null; // Replace with your actual implementation
    }

    public async deleteUser(id: string): Promise<any> {
        // Implement your logic to delete a user from the database or any other data source
        // For example, using Mongoose:
        return await userModel.findByIdAndDelete(id);
        // return null; // Replace with your actual implementation
    }
}

export default UserService;