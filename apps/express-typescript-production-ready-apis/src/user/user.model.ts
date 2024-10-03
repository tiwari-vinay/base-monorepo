import * as mongoose from 'mongoose';
import User from './user.interface';

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    get: () => undefined,
  },
  address: addressSchema,
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} + ${this.lastName}`;
});

userSchema.virtual('post', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const userModel = mongoose.model <User & mongoose.Document> ('User', userSchema);
console.log("model created");

export default userModel;