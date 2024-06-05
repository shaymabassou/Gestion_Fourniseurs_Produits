const slugify = require('slugify');
const db = require('../../database/db.config');
const Supplier = db.suppliers; // Assurez-vous que vous avez un modèle de données pour les fournisseurs dans votre base de données.
// Création d'un fournisseur
exports.create = (req, res) => {
    const { name,  contactPerson, email, slug } = req.body;
    if (!name ||  !contactPerson || !email || !slug) {
        return res.status(400).send({
            message: 'Tous les champs sont requis.'
        });
    }
    const slugy = slugify(name, { lower: true });
    const newSupplier = new Supplier({
        name: name,
        contactPerson: contactPerson,
        email: email,
        slug: slug
    });

    newSupplier.save().then((supplier) => {
        // Récupérer l'ID du fournisseur nouvellement créé
        const supplierId = supplier.id;

        

        res.status(200).send({
            message: 'Fournisseur créé avec succès.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la création du fournisseur.'
        });
    });
};


// Récupération de tous les fournisseurs
exports.findAll = (req, res) => {
    Supplier.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: 'Une erreur s\'est produite lors de la récupération des fournisseurs.'
        });
    });
};

// Suppression d'un fournisseur par ID
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du fournisseur requis.' });
    }
    Supplier.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Fournisseur non trouvé.' });
        }
        res.status(200).send({ message: 'Fournisseur supprimé avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la suppression du fournisseur.' });
    });
};

// Récupération d'un fournisseur par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du fournisseur requis.' });
    }
    Supplier.findById(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Fournisseur non trouvé.' });
        }
        res.send(data);
    }).catch(err => {
       // console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la récupération du fournisseur.' });
    });
};

// Mise à jour d'un fournisseur par ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name,  contactPerson, email,slug } = req.body;
    if (!id || !name || !contactPerson || !email || !slug) {
        return res.status(400).send({ message: 'Tous les champs sont requis.' });
    }
    Supplier.findByIdAndUpdate(id, {
        name: name,
        contactPerson: contactPerson,
        email: email,
        slug:slug
    }, { useFindAndModify: false }).then((data) => {
        if (!data) {
            res.status(404).send({ message: `Impossible de mettre à jour le fournisseur avec l'ID=${id}.` });
        }
        res.status(200).send({ message: 'Fournisseur mis à jour avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la mise à jour du fournisseur.' });
    });
};
