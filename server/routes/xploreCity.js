const express=require('express');
const router=express.Router();
const xploreCityController=require('../controllers/xploreCityController');

/**
 *Contains all app routes
 */

router.get('/',xploreCityController.login);
router.get('/home',xploreCityController.home);
router.get('/categories',xploreCityController.xploreCategories);
router.get('/place/:id',xploreCityController.xplorePlaces);
router.get('/categories/:id',xploreCityController.xploreCategoriesByID);
router.post('/search',xploreCityController.searchPlace);
router.get('/xplore-latest',xploreCityController.xploreLatest);
router.get('/xplore-random',xploreCityController.xploreRandom);
router.get('/submit-entry',xploreCityController.submitEntry);
router.post('/submit-entry',xploreCityController.submitEntryOnPost);
router.get('/about',xploreCityController.about);
router.get('/contact',xploreCityController.contact);
router.post('/like',xploreCityController.like);
router.get('/signup',xploreCityController.signup);
router.get('/login',xploreCityController.login);
router.post('/signup',xploreCityController.signupOnPost);
router.post('/login',xploreCityController.loginOnPost);
router.get('/logout',xploreCityController.logoutPage);
router.use('',xploreCityController.err404);
router.use('',xploreCityController.err500);

module.exports=router;