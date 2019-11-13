const moongose = require('mongoose');

const SpotSchema = new moongose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    },
});

SpotSchema.virtual('thumbnail_url').get(function() {
    return `${process.env.LOCALHOST_URL}/files/${this.thumbnail}`
});

module.exports = moongose.model('Spot', SpotSchema);