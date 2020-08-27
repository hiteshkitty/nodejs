const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desig: {
        type: String,
        required: true
    },
    salary: {
        type: Currency,
        required: true,
        min: 0
    },
    address:[addressSchema]
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leaders', leaderSchema);

module.exports = Leaders;