const slugify = require('slugify');
const db = require('../../database/db.config');
const Product = db.products; //
// Création d'un produit

exports.create = (req, res) => {
    const { name, description, price, supplier, image } = req.body;
    if (!name || !description || !price || !supplier || !image) {
        return res.status(400).send({
            message: 'Tous les champs sont requis.'
        });
    }
    const slugy = slugify(name, { lower: true });
    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        supplier: supplier,
        image: image // Stockez l'URL de l'image
    });
    newProduct.save().then((data) => {
        res.status(200).send({
            message: 'Produit créé avec succès.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la création du produit.'
        });
    });
};


// Récupération de tous les produits
exports.findAll = (req, res) => {
    Product.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la récupération des produits.'
        });
    });
};

// Suppression d'un produit par ID
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du produit requis.' });
    }
    Product.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Produit non trouvé.' });
        }
        res.status(200).send({ message: 'Produit supprimé avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la suppression du produit.' });
    });
};

// Récupération d'un produit par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du produit requis.' });
    }
    Product.findById(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Produit non trouvé.' });
        }
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la récupération du produit.' });
    });
};

// Mise à jour d'un produit par ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, description, price , supplier, image} = req.body;
    if (!id || !name || !description || !price  || !supplier || !image ) {
        return res.status(400).send({ message: 'Tous les champs sont requis.' });
    }
    Product.findByIdAndUpdate(id, {
        name: name,
        description: description,
        price: price,
        supplier:supplier,
        image:image
      
    }, { useFindAndModify: false }).then((data) => {
        if (!data) {
            res.status(404).send({ message: `Impossible de mettre à jour le produit avec l'ID=${id}.` });
        }
        res.status(200).send({ message: 'Produit mis à jour avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la mise à jour du produit.' });
    });
};

exports.search = (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).send({ message: "Le paramètre 'name' est requis pour la recherche." });
    }

    const query = { name: { $regex: new RegExp(name), $options: "i" } };

    Product.find(query)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Une erreur s'est produite lors de la recherche des produits.",
            });
        });
};

