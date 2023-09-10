import mongoose from 'mongoose';

const loginInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  browser: {
    type: String,
  },
  browserVersion: {
    type: String,
  },
  os: {
    type: String,
  },
  osVersion: {
    type: String,
  },
  device: {
    type: String,
  },
  ip: {
    type: String,
  }
}, {
  timestamps: true,
})

const LoginInfo = mongoose.model('LoginInfo', loginInfoSchema);
export default LoginInfo;
