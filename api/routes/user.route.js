import express from 'express';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser) //The route path where this handler is registered. The :id part is a route parameter, which is a placeholder for the user’s ID. ,also verify the token
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)       //only verified person can see their listing on profile page->verifytoken
router.get('/:id', verifyToken, getUser)        //for contacting the landlord

export default router;