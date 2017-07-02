import mongoose from 'mongoose';

const mortoSchema = mongoose.Schema({
  name: String,
  current: Boolean,
});

const Morto = mongoose.model('Morto', mortoSchema);

export default Morto;
