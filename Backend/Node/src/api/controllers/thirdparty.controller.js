const slugify = require('slugify');
const db = require('../../database/db.config');
const ThirdParty = db.thirdParties; // Assurez-vous que le modèle est correctement importé

// Création d'un tiers
exports.create = (req, res) => {
    const { name, type, address } = req.body;
    if (!name || !type || !address) {
        return res.status(400).send({ message: 'Tous les champs sont requis.' });
    }
    const slug = slugify(name, { lower: true });
    const newThirdParty = new ThirdParty({
        name: name,
        type: type,
        address: address,
        slug: slug
    });
    newThirdParty.save().then((data) => {
        res.status(200).send({ message: 'Tiers créé avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la création du tiers.' });
    });
};

// Récupération de tous les tiers
exports.findAll = (req, res) => {
    ThirdParty.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la récupération des tiers.' });
    });
};

// Suppression d'un tiers par ID
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du tiers requis.' });
    }
    ThirdParty.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Tiers non trouvé.' });
        }
        res.status(200).send({ message: 'Tiers supprimé avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la suppression du tiers.' });
    });
};

// Récupération d'un tiers par ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: 'ID du tiers requis.' });
    }
    ThirdParty.findById(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: 'Tiers non trouvé.' });
        }
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la récupération du tiers.' });
    });
};

// Mise à jour d'un tiers par ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, type, address } = req.body;
    if (!id || !name || !type || !address) {
        return res.status(400).send({ message: 'Tous les champs sont requis.' });
    }
    ThirdParty.findByIdAndUpdate(id, {
        name: name,
        type: type,
        address: address
    }, { useFindAndModify: false }).then((data) => {
        if (!data) {
            res.status(404).send({ message: `Impossible de mettre à jour le tiers avec l'ID=${id}.` });
        }
        res.status(200).send({ message: 'Tiers mis à jour avec succès.' });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la mise à jour du tiers.' });
    });
};
