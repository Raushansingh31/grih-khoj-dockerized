import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);  //listing is a model which is created
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {    //delete the listing 
  const listing = await Listing.findById(req.params.id);    //finding from the database

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {  //searching functionality
  try {
    const limit = parseInt(req.query.limit) || 9;   //if there is a limit use it otherwise 9, Determines how many listings to return.
    const startIndex = parseInt(req.query.startIndex) || 0; // Determines the starting point for the returned listings (used for pagination). Defaults to 0 if not provided.
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };   //matches any value (true or false).
    }

    let furnished = req.query.furnished; //req.query is an object in Express.js that contains the query string parameters sent in a URL in a GET request. Query string parameters are the part of the URL that come after the ? symbol and are typically used to pass data to the server.

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || ''; //A string used to search listings by name. Uses a regular expression to perform a case-insensitive match. Defaults to an empty string, which matches all listings.

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({   //database query
      name: { $regex: searchTerm, $options: 'i' }, //Searches the name field using a case-insensitive(comes from option i) regular expression based on searchTerm. search will find any matches anywhere any no. of times
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })    //sorts the results based on the sort field and order direction.
      .limit(limit)
      .skip(startIndex);    //used in pagination by skipping initial listing

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
