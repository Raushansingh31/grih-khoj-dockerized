import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) //id getting from verfiy token
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10); //encypting updated password
    }

    const updatedUser = await User.findByIdAndUpdate( //update user model
      req.params.id, //which id to update
      {
        $set: { //This is a MongoDB update operator that replaces the value of a field with the specified value.
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } //This option ensures that the method returns the updated document instead of the original one before the update.
    );

    const { password, ...rest } = updatedUser._doc; //not sending the password

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) //req.user.id: This is the ID of the currently authenticated user, typically set by middleware after verifying a token. req.params.id: This is the ID of the user account that the request is trying to delete, extracted from the URL.
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token'); //simply clear cookie
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {      //matching the id, req.user.id: This is the ID of the authenticated user, typically provided by middleware after verifying a token.
    //req.params.id: This is the ID of the user whose listings are being requested, extracted from the URL parameters.
    try {
      const listings = await Listing.find({ userRef: req.params.id });    //useref is a field in database 
      res.status(200).json(listings);
    } catch (error) {
      next(error);    //If an error occurs during the database query, it is caught and passed to the next middleware for error handling.
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getUser = async (req, res, next) => {    //for getting the information at contact page
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
