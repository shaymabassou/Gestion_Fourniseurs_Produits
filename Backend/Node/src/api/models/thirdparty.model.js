module.exports = mongoose => {
    const Schema = mongoose.Schema;

    let ThirdPartySchema = new Schema({
        name: { type: String, required: true },
        type: { type: String, required: true },
        address: { type: String, required: true },
        slug: { type: String, required: true },
        // Autres champs nécessaires pour le tiers
    }, { timestamps: true });

    // Ajout de la méthode toJSON pour formater la réponse JSON
    ThirdPartySchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    // Création du modèle ThirdParty basé sur le schéma
    const ThirdParty = mongoose.model('ThirdParty', ThirdPartySchema);
    return ThirdParty;
}

