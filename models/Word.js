const mongoose = require("mongoose");
const name = 'Word';
const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    }
});

const model = mongoose.model(name, schema);

module.exports = {
    model,
    schema
};
