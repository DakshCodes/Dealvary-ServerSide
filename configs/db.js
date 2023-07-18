const mongoose = require("mongoose");

module.exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DB Connected Successfully");
    }).catch((err) => {
        console.log(err.message);
    })
}