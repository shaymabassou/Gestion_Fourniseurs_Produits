module.exports = app => {
    const router = require('express').Router();

    const supplierController = require('../controllers/supplier.controller');
    const productController = require('../controllers/product.controller');
    const thirdpartyController = require('../controllers/thirdparty.controller');
    const userController= require('../controllers/user.controller');
   
    // Routes pour les fournisseurs
    router.post('/suppliers', supplierController.create);
    router.get('/suppliers', supplierController.findAll);
    router.get('/suppliers/:id', supplierController.findOne);
    router.delete('/suppliers/:id', supplierController.delete);
    router.put('/suppliers/:id', supplierController.update);

    // Routes pour les produits
    router.post('/products', productController.create);
    router.get('/products', productController.findAll);
    router.get('/products/:id', productController.findOne);
    router.delete('/products/:id', productController.delete);
    router.put('/products/:id', productController.update);
    router.get('/products/search', productController.search);


    // Routes pour les tiers
    router.post('/thirdParties', thirdpartyController.create);
    router.get('/thirdParties', thirdpartyController.findAll);
    router.get('/thirdParties/:id', thirdpartyController.findOne);
    router.delete('/thirdParties/:id', thirdpartyController.delete);
    router.put('/thirdParties/:id', thirdpartyController.update);

    //User route
    router.post('/register', userController.registerUser)
    router.post('/login' , userController.loginUser)

    app.use('/api/', router);
}
