const mongoose = require('mongoose');
const User = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedAdmin = async () => {
    await User.deleteMany({});
    const admin = new User({ email: 'admin@example.com', username: 'admin', role: 'admin' });
    await User.register(admin, 'adminpassword');
    console.log('Admin user created');
};

seedAdmin().then(() => {
    mongoose.connection.close();
});
