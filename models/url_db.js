const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        short_id: {
            type: String,
            required: true,
            unique: true
        },
        redirecturl: {
            type: String,
            required: true
        },
        visits: [{ timestamp: { type: Number } }]
    },
    { timestamps: true }
);

const Url = mongoose.model('url', urlSchema);

module.exports = Url;
