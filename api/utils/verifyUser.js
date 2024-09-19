import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //access_token -> name of token

  if (!token) return next(errorHandler(401, 'Unauthorized')); //using middleware next

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //verifying and returning callback
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user; //sending info to next
    next();
  });
};
