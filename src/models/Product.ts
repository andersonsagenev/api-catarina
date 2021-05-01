import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  thumbnail: String,
  name: String,
  description: String,
  price: Number,
  location: String,
  status: Boolean,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  toJSON: {
    virtuals: true
  }
});

ProductSchema.virtual('thumbnail_url').get(function(){
  return `http://localhost:3333/files/${this.thumbnail}`;
})

export default model('Product', ProductSchema);