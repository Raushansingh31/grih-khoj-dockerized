import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);     //update the listing after verifying through the token
router.get('/get/:id', getListing);     //just getting the listing
router.get('/get', getListings);        //FOR SEarch functionality, does not mention id because we want more than one listing

export default router;
