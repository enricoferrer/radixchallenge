import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
    equipmentId: String,
    timestamp: String,
    value: Number,
})

var Equipment = mongoose.model('equipment', equipmentSchema);
export default Equipment;