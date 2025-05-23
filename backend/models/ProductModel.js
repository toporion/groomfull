const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSChema =new Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    category: { type: String },
    description: { type: String },
    sellPrice: { type: Number }, // optional if variants exist
    purchasePrice: { type: Number },
    quantityInStock: { type: Number, default: 0 }, // total of all variants (optional)
    unit: { type: String, default: 'pcs' },
    profileImage: { type: String },
    lowStockThreshold: { type: Number, default: 5 }, // alert when stock is under this
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' }
  }, { timestamps: true });
const ProductModel = mongoose.model('Product', productSChema);
module.exports = ProductModel;