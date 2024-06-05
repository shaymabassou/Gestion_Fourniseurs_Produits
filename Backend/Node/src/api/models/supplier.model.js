module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const SupplierSchema = new Schema({
        name: { type: String, required: true },
        contactPerson: { type: String, required: true },
        email: { type: String, required: true },
        slug: { type: String, required: true },
        //products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // Liste d'identifiants de produits fournis par ce fournisseur
    }, {
        timestamps: true
    });

    SupplierSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        if (_id) {
            object.id= _id;
        }
        return object;
    });

    const Supplier = mongoose.model('Supplier', SupplierSchema);
    return Supplier;
}

    

