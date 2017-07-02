import mongoose from 'mongoose';

const ruleSchema = mongoose.Schema({
  rule: String
});
const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;
