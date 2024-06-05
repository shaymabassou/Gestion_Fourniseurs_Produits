module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const ProductSchema = new Schema({
        
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        supplier:{type: Schema.Types.ObjectId, ref:' Supplier' , required:true},
        image: { type: String }

       
    }, {
        timestamps: true
    });

    ProductSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Product = mongoose.model('Product', ProductSchema);
    return Product;
};
