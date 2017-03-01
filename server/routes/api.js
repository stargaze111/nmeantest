const express = require('express');
const router = express.Router();
var groupArray = require('group-array');
var mongoose     = require('mongoose');

mongoose.connect('mongodb://heroku_rh8l09kt:lh32impfks5bho8c60ljefcvs9@ds157539.mlab.com:57539/heroku_rh8l09kt');
mongoose.set('debug', true); // turn on debug


var Inventory     = require('../../src/app/models/inventory');
var Shopper     = require('../../src/app/models/shopper');
var CartItem     = require('../../src/app/models/cart-item');
var WishListItem     = require('../../src/app/models/wishlist-item');


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
        shopper.password = req.body.password;

        var crypto     = require('crypto');
        shopper.password = crypto.createHash('md5').update(shopper.password).digest("hex");


        // save the shopper and check for errors
        shopper.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'shopper Item created!',crn:shopper.crn });
        });

    })
    .get(function(req, res) {

		// get all the shoppers (accessed at GET http://localhost:8080/api/shoppers)
        Shopper.find(function(err, shoppers) {
            if (err)
                res.send(err);

            res.json(shoppers);
        });
    });

router.route('/shopper/:crn')

    // get the shopper with that id (accessed at GET http://localhost:8080/api/shoppers/:crn)
    .get(function(req, res) {
        Shopper.find({"crn":req.params.crn}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(shopper);
        });
    })

    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        Shopper.find({"crn":req.params.crn}, function(err, shopper) {

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
	        Shopper.remove({
	            _id: req.params.crn
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Successfully deleted' });
	        });
	    });


router.route('/shopper/email/:email')

    // get the shopper with that id (accessed at GET http://localhost:8080/api/shoppers/:email)
    .get(function(req, res) {
        Shopper.find({"email":req.params.email}, function(err, shopper) {
            if (err)
                res.send(err);
            res.json(shopper);
        });
    })

    .put(function(req, res) {

        // use our shopper model to find the shopper we want
        Shopper.find({"email":req.params.email}, function(err, shopper) {

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
	        Shopper.remove({
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

        var cartItem = new CartItem();      // create a new instance of the shopper model
        cartItem.shopperCrn = req.body.shopperCrn;
        cartItem.itemBarcode = req.body.itemBarcode;
        cartItem.itemName = req.body.itemName;
        cartItem.itemDescription = req.body.itemDescription;
        cartItem.itemThumb = req.body.itemThumb;
        cartItem.itemPrice = req.body.itemPrice;
        cartItem.itemCurrency = req.body.itemCurrency;
        cartItem.itemShipping = req.body.itemShipping;
        cartItem.itemStatus = req.body.itemStatus;

        if(cartItem.itemStatus==null||cartItem.itemStatus.trim()==''){
          cartItem.itemStatus = "PENDING";
		}

        if(cartItem.itemSummaryStatus==null||cartItem.itemSummaryStatus.trim()==''){
          cartItem.itemSummaryStatus = "ACTIVE";
		}

        // save the shopper and check for errors
        cartItem.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Cart Item created!' });
        });

    });


router.route('/cart/:shopperCrn')
    // get the shopper with that id (accessed at GET http://localhost:8080/api/cart/:shopperCrn)
    .get(function(req, res) {
        CartItem.find({"shopperCrn":req.params.shopperCrn,"itemStatus":"PENDING"}, function(err, items) {
            if (err)
                res.send(err);

            res.json(items);

        });
    });

    router.route('/cart/:shopperCrn/:itemBarcode').put(function(req, res) {

        // use our shopper model to find the shopper we want
        CartItem.find({"shopperCrn":req.params.shopperCrn,"itemBarcode":req.params.itemBarcode}, function(err, cartItem) {

            if (err)
                res.send(err);

        cartItem.itemName = req.body.itemName;
        cartItem.itemDescription = req.body.itemDescription;
        cartItem.itemThumb = req.body.itemThumb;
        cartItem.itemPrice = req.body.itemPrice;
        cartItem.itemCurrency = req.body.itemCurrency;
        cartItem.itemShipping = req.body.itemShipping;
        cartItem.itemStatus = req.body.itemStatus;

		if(cartItem.itemStatus==null||cartItem.itemStatus.trim()==''){
          cartItem.itemStatus = "PENDING";
		}

        if(cartItem.itemSummaryStatus==null||cartItem.itemSummaryStatus.trim()==''){
          cartItem.itemSummaryStatus = "ACTIVE";
		}

            // save the shopper
            cartItem.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Cart updated!' });
            });

        });
    })
    .delete(function(req, res) {
	        CartItem.remove({
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

        var wishListItem = new WishListItem();      // create a new instance of the shopper model
        wishListItem.shopperCrn = req.body.shopperCrn;
        wishListItem.itemBarcode = req.body.itemBarcode;
        wishListItem.itemName = req.body.itemName;
        wishListItem.itemDescription = req.body.itemDescription;
        wishListItem.itemThumb = req.body.itemThumb;
        wishListItem.itemPrice = req.body.itemPrice;
        wishListItem.itemCurrency = req.body.itemCurrency;
        wishListItem.itemShipping = req.body.itemShipping;
        wishListItem.itemStatus = req.body.itemStatus;

		if(wishListItem.itemStatus==null||wishListItem.itemStatus.trim()==''){
          wishListItem.itemStatus = "PENDING";
		}
        if(wishListItem.itemSummaryStatus==null||wishListItem.itemSummaryStatus.trim()==''){
          wishListItem.itemSummaryStatus = "ACTIVE";
		}

        // save the shopper and check for errors
        wishListItem.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'WishList Item created!' });
        });

    });

router.route('/wishList/:shopperCrn')
    // get the shopper with that id (accessed at GET http://localhost:8080/api/cart/:shopperCrn)
    .get(function(req, res) {
        WishListItem.find({"shopperCrn":req.params.shopperCrn,,"itemStatus":"PENDING"}, function(err, items) {
            if (err)
                res.send(err);

				res.json(items);

        });
    });

    router.route('/wishList/:shopperCrn/:itemBarcode').put(function(req, res) {

        // use our shopper model to find the shopper we want
        WishListItem.find({"shopperCrn":req.params.shopperCrn,"itemBarcode":req.params.itemBarcode}, function(err, wishList) {

            if (err)
                res.send(err);


        wishListItem.itemName = req.body.itemName;
        wishListItem.itemDescription = req.body.itemDescription;
        wishListItem.itemThumb = req.body.itemThumb;
        wishListItem.itemPrice = req.body.itemPrice;
        wishListItem.itemCurrency = req.body.itemCurrency;
        wishListItem.itemShipping = req.body.itemShipping;
        wishListItem.itemStatus = req.body.itemStatus;

        if(wishListItem.itemStatus==null||wishListItem.itemStatus.trim()==''){
          wishListItem.itemStatus = "PENDING";
		}

        if(wishListItem.itemSummaryStatus==null||wishListItem.itemSummaryStatus.trim()==''){
          wishListItem.itemSummaryStatus = "ACTIVE";
		}
            // save the shopper
            wishListItem.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'WishList updated!' });
            });

        });
    })
    .delete(function(req, res) {
	        WishListItem.remove({
	            "shopperCrn": req.params.shopperCrn,
	            "itemBarcode": req.params.itemBarcode
	        }, function(err, shopper) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'WishList successfully deleted' });
	        });
	    });


module.exports = router;