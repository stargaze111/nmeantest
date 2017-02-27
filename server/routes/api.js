const express = require('express');
const router = express.Router();

var mongoose     = require('mongoose');

mongoose.connect('mongodb://heroku_k8bk6pcl:2qrvt46ca4ol77cog511lhp00v@ds157469.mlab.com:57469/heroku_k8bk6pcl');
mongoose.set('debug', true); // turn on debug


var Inventory     = require('../../src/app/models/inventory');
var Shopper     = require('../../src/app/models/shopper');
var Cart     = require('../../src/app/models/cart');
var WishList     = require('../../src/app/models/wishlist');


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});


router.route('/inventory')

    // create a inventory (accessed at POST http://localhost:8080/api/inventories)
    .post(function(req, res) {

        var inventory = new Inventory();      // create a new instance of the Inventory model
        inventory.itemBarcode = req.body.itemBarcode;
        inventory.itemName = req.body.itemName;
        inventory.itemDescription = req.body.itemDescription;
        inventory.itemImageUrl = req.body.itemImageUrl;
        inventory.itemPrice = req.body.itemPrice;
        inventory.itemCurrency = req.body.itemCurrency;

        // save the inventory and check for errors
        inventory.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Inventory Item created!' });
        });

    })
    .get(function(req, res) {

		// get all the inventories (accessed at GET http://localhost:8080/api/inventories)
        Inventory.find(function(err, inventories) {
            if (err)
                res.send(err);

            res.json(inventories);
        });
    });

router.route('/inventory/:barcode')

    // get the inventory with that id (accessed at GET http://localhost:8080/api/inventories/:barcode)
    .get(function(req, res) {
        Inventory.find({"itemBarcode":req.params.barcode}, function(err, inventory) {
            if (err)
                res.send(err);
            res.json(inventory);
        });
    })

    .put(function(req, res) {

        // use our inventory model to find the inventory we want
        Inventory.find({"itemBarcode":req.params.barcode}, function(err, inventory) {

            if (err)
                res.send(err);

            inventory.name = req.body.name;  // update the inventories info

            // save the inventory
            inventory.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Inventory updated!' });
            });

        });
    })

    .delete(function(req, res) {
	        Inventory.remove({
	            _id: req.params.barcode
	        }, function(err, inventory) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Successfully deleted' });
	        });
	    });


//shopper details
router.route('/shopper')

    // create a shopper (accessed at POST http://localhost:8080/api/shoppers)
    .post(function(req, res) {

        var shopper = new Shopper();      // create a new instance of the shopper model
        shopper.firstName = req.body.firstName;
        shopper.lastName = req.body.lastName;
        shopper.email = req.body.email;
        shopper.mobilePhone = req.body.mobilePhone;
        shopper.gender = req.body.gender;
        shopper.address = req.body.address;



        // save the shopper and check for errors
        shopper.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'shopper Item created!',crn:shopper.crn });
        });

    })
    .get(function(req, res) {

		// get all the shoppers (accessed at GET http://localhost:8080/api/shoppers)
        shopper.find(function(err, shoppers) {
            if (err)
                res.send(err);

            res.json(shoppers);
        });
    });

router.route('/shopper/:crn')

    // get the shopper with that id (accessed at GET http://localhost:8080/api/shoppers/:crn)
    .get(function(req, res) {
        shopper.find({"crn":req.params.crn}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(shopper);
        });
    })

    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        shopper.find({"crn":req.params.crn}, function(err, shopper) {

            if (err)
                res.send(err);

	shopper.firstName = req.body.firstName;
        shopper.lastName = req.body.lastName;
        shopper.email = req.body.email;
        shopper.mobilePhone = req.body.mobilePhone;
        shopper.gender = req.body.gender;
        shopper.address = req.body.address;

            // save the shopper
            shopper.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'shopper updated!' });
            });

        });
    })

    .delete(function(req, res) {
	        shopper.remove({
	            _id: req.params.crn
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Successfully deleted' });
	        });
	    });


router.route('/shopper/:email')

    // get the shopper with that id (accessed at GET http://localhost:8080/api/shoppers/:email)
    .get(function(req, res) {
        shopper.find({"email":req.params.email}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(shopper);
        });
    })

    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        shopper.find({"email":req.params.email}, function(err, shopper) {

            if (err)
                res.send(err);

		shopper.firstName = req.body.firstName;
		shopper.lastName = req.body.lastName;
		shopper.mobilePhone = req.body.mobilePhone;
		shopper.gender = req.body.gender;
		shopper.address = req.body.address;

            // save the shopper
            shopper.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'shopper updated!' });
            });

        });
    })

    .delete(function(req, res) {
	        shopper.remove({
	            _id: req.params.email
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Successfully deleted' });
	        });
	    });



//cart details
router.route('/cart')

    // create a shopper (accessed at POST http://localhost:8080/api/shoppers)
    .post(function(req, res) {

        var cart = new Cart();      // create a new instance of the shopper model
        cart.shopperCrn = req.body.shopperCrn;
        cart.itemBarcode = req.body.itemBarcode;
        cart.itemName = req.body.itemName;
        cart.itemDescription = req.body.itemDescription;
        cart.itemImageUrl = req.body.itemImageUrl;
        cart.itemPrice = req.body.itemPrice;
        cart.itemCurrency = req.body.itemCurrency;
        cart.itemStatus = req.body.itemStatus;


        // save the shopper and check for errors
        cart.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Cart Item created!' });
        });

    })
    .get(function(req, res) {

		// get all the shoppers (accessed at GET http://localhost:8080/api/carts)
        cart.find(function(err, carts) {
            if (err)
                res.send(err);

            res.json(carts);
        });
    });

router.route('/cart/:shopperCrn')
    // get the shopper with that id (accessed at GET http://localhost:8080/api/cart/:shopperCrn)
    .get(function(req, res) {
        cart.find({"shopperCrn":req.params.shopperCrn}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(cart);
        });
    })
    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        cart.find({"shopperCrn":req.params.shopperCrn,"itemBarcode":req.params.itemBarcode}, function(err, shopper) {

            if (err)
                res.send(err);

	    cart.itemName = req.body.itemName;
        cart.itemDescription = req.body.itemDescription;
        cart.itemImageUrl = req.body.itemImageUrl;
        cart.itemPrice = req.body.itemPrice;
        cart.itemCurrency = req.body.itemCurrency;
        cart.itemStatus = req.body.itemStatus;

            // save the shopper
            cart.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Cart updated!' });
            });

        });
    })
    .delete(function(req, res) {
	        cart.remove({
	            "shopperCrn": req.params.shopperCrn,
	            "itemBarcode": req.params.itemBarcode
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Cart successfully deleted' });
	        });
	    });



//wishList details
router.route('/wishList')

    // create a shopper (accessed at POST http://localhost:8080/api/wishLists)
    .post(function(req, res) {

        var wishList = new WishList();      // create a new instance of the shopper model
        wishList.shopperCrn = req.body.shopperCrn;
        wishList.itemBarcode = req.body.itemBarcode;
        wishList.itemName = req.body.itemName;
        wishList.itemDescription = req.body.itemDescription;
        wishList.itemImageUrl = req.body.itemImageUrl;
        wishList.itemPrice = req.body.itemPrice;
        wishList.itemCurrency = req.body.itemCurrency;
        wishList.itemStatus = req.body.itemStatus;


        // save the shopper and check for errors
        wishList.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'WishList Item created!' });
        });

    })
    .get(function(req, res) {

		// get all the shoppers (accessed at GET http://localhost:8080/api/wishList)
        wishList.find(function(err, wishLists) {
            if (err)
                res.send(err);

            res.json(wishLists);
        });
    });

router.route('/wishList/:shopperCrn')
    // get the shopper with that id (accessed at GET http://localhost:8080/api/cart/:shopperCrn)
    .get(function(req, res) {
        wishList.find({"shopperCrn":req.params.shopperCrn}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(cart);
        });
    })
    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        wishList.find({"shopperCrn":req.params.shopperCrn,"itemBarcode":req.params.itemBarcode}, function(err, shopper) {

            if (err)
                res.send(err);

	    wishList.itemName = req.body.itemName;
        wishList.itemDescription = req.body.itemDescription;
        wishList.itemImageUrl = req.body.itemImageUrl;
        wishList.itemPrice = req.body.itemPrice;
        wishList.itemCurrency = req.body.itemCurrency;
        wishList.itemStatus = req.body.itemStatus;

            // save the shopper
            wishList.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'WishList updated!' });
            });

        });
    })
    .delete(function(req, res) {
	        wishList.remove({
	            "shopperCrn": req.params.shopperCrn,
	            "itemBarcode": req.params.itemBarcode
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'WishList successfully deleted' });
	        });
	    });


module.exports = router;