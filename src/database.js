import mongoose from 'mongoose';
const URI = "mongodb://localhost/companydb";

mongoose.connect(URI, (err, db) => {
    if(err) {
        throw err
    }
    else {
        console.log("Db is Connected");
        //db.close();
    }
});