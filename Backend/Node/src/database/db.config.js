const config=require('../config/config');
const mongoose=require('mongoose');
const db={};
mongoose.Promise=global.Promise;
mongoose.set('strictQuery',false);
db.mongoose=mongoose;
db.url=config.DB_URL;
db.suppliers=require('../api/models/supplier.model')(mongoose);
db.products=require('../api/models/product.model')(mongoose);
db.thirdParties=require('../api/models/thirdparty.model')(mongoose);


module.exports=db;
