require('../models/database');
const Category = require('../models/Category');
const Place = require('../models/Place');
const User = require('../models/User');
const bcrypt = require('bcrypt');
/**
 * GET /home
 * return home
 */

exports.home = async (req, res) => {

    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Place.find({}).sort({ _id: -1 }).limit(5);
        const food = await Place.find({ 'category': 'Food' }).limit(5);
        const hist = await Place.find({ 'category': 'Historical Monuments' }).limit(5);
        const park = await Place.find({ 'category': 'Park' }).limit(5);
        const market = await Place.find({ 'category': 'Market' }).limit(5);
        const museum = await Place.find({ 'category': 'Museum' }).limit(5);
        const waterfall = await Place.find({ 'category': 'Waterfall' }).limit(5);
        const zoo = await Place.find({ 'category': 'Zoo' }).limit(5);
        const stadium = await Place.find({ 'category': 'Stadium' }).limit(5);
        const games = await Place.find({ 'category': 'Games' }).limit(5);

        //passing the entries that contains latest
        const entry = { latest, food, hist, park, market, museum, waterfall, zoo, stadium, games };
        res.render('index', { title: 'Xplore City: Home', categories, entry });
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /categories
 */
exports.xploreCategories = async (req, res) => {

    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Xplore City: Categories', categories });
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /place/:id
 */
exports.xplorePlaces = async (req, res) => {
    try {
        let placeID = req.params.id;
        const place = await Place.findById(placeID);
        res.render('place', { title: 'Xplore City: Places', place });
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /categories/:id
 */
exports.xploreCategoriesByID = async (req, res) => {

    try {
        let categoryID = req.params.id;
        const limitNumber = 20;
        const categoryByID = await Place.find({ 'category': categoryID }).limit(limitNumber);
        res.render('categories', { title: 'Xplore City: Categories', categoryByID });
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * POST /search
 */
exports.searchPlace = async (req, res) => {
    try {

        let searchTerm = req.body.searchTerm;
        let place = await Place.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { title: 'Xplore City: Search', place });
    } catch (error) {
        console.log(error);
    }

}

/**
 * GET /xplore-latest
 */
exports.xploreLatest = async (req, res) => {

    try {
        const limitNumber = 20;
        const place = await Place.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('xplore-latest', { title: 'Xplore City: Place', place });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /xplore-random
 */
exports.xploreRandom = async (req, res) => {

    try {
        let count = await Place.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let place = await Place.findOne().skip(random).exec();
        res.render('xplore-random', { title: 'Xplore City: Random', place });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /submit-entry
 */
exports.submitEntry = async (req, res) => {

    try {
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render('submit-entry', { title: 'Xplore City: Submit', infoErrorsObj, infoSubmitObj });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * POST /submit-entry
 */
exports.submitEntryOnPost = async (req, res) => {

    try {

        let imageUploadFile;
        let upladPath;
        let newImageName;

        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No file uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            upladPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(upladPath, function (err) {
                if (err) return res.status(500).send(err);
            })
        }
        const newPlace = new Place({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            category: req.body.category,
            special_notes: req.body.notes,
            image: newImageName,
            email: req.body.email
        });

        await newPlace.save();
        req.flash('infoSubmit', 'Place added successfully.');
        res.redirect('/submit-entry');
    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/submit-entry');
    }



}

/**
 * GET /about
 */

exports.about = async (req, res) => {

    try {
        res.render('about', { title: 'Xplore City: About' });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /contact
 */

exports.contact = async (req, res) => {

    try {
        res.render('contact', { title: 'Xplore City: contact' });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /signup
 */

exports.signup = async (req, res) => {

    try {
        res.sendFile('signup.html', { root: './public' });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * POST /signup
 */

exports.signupOnPost = async (req, res) => {

    try {
        const user = new User(
            {
                email: req.body.username,
                password: req.body.password

            }
        )



        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            res.send("Email is taken already. Try another.");
        }
        else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
            const userData = await user.save();
            console.log(userData);
            res.redirect('/');
        }

    }
    catch (error) {
        console.log(error);
    }

}

/**
 * GET /login
 */

exports.login = async (req, res) => {
    try {
        res.sendFile('login.html', { root: './public' });
        // Send the login.html file located in the 'public' directory
    } catch (error) {
        console.log(error);
    }
};

/**
 * POST /login
 */

exports.loginOnPost = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.username });

        if (!user) {
            // Username not found
            return res.send('Username not found');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordMatch) {
            // Password matches, render the index page or redirect to the appropriate route
            res.redirect('/home');
        } else {
            // Incorrect password
            res.send('Wrong password');
        }
    } catch (error) {
        console.log(error);
    }
};

/**Logout */
exports.logoutPage = async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).render(err500);
        } else {
            // Redirect to the login page or any other page after logout
            res.redirect('/login');
        }
    });
}





/**
 * POST /like
 */

exports.like = async (req, res) => {

    const postId = req.body.postId;

    try {
        const post = await Place.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Increment the likes count and save the updated post
        post.likes += 1;
        await post.save();

        res.status(200).send('Liked successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to like');
    }

}

/**
 * 404 err
 */
exports.err404 = async (req, res) => {

    try {
        res.render('err404', { title: 'Page not found!!' });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}

/**
 * 500 err
 */
exports.err500 = async (req, res) => {

    try {
        res.render('err500', { title: 'Internal Server error' });
        //    file jis ch render krna,oda title,render ki krna
    }
    catch (error) {
        console.log(error);
    }

}



/**
 * const newCategory = new Category({
    name: '',
    image: ''
    
  });

  await Category.insertOne(newCategory);
 */