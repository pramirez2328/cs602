import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Create User model
const User = mongoose.model('User', userSchema);
/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<Object|null>} user object or null if not found
 */
export async function getUserByUsername(username) {
  return await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
}

/**
 * Create a new user
 * @param {string} username
 * @param {string} password
 * @param {string} role (default: 'user')
 * @returns {Promise<Object>} created user object
 */
export async function createUser(username, password, role = 'user') {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  return await newUser.save();
}

// Export the User model
export { User };
