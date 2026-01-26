const mongoose = require('mongoose');
const connectToDatabase = require('../database');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Store = require('../models/Store');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log(`Connected to database: ${mongoose.connection.name}`);

    console.log('Clearing existing data...');
    await Organization.deleteMany({});
    await User.deleteMany({});
    await Store.deleteMany({});

    console.log('Creating organizations...');
    const org1 = await Organization.create({
      name: 'Tech Corp',
      email: 'contact@techcorp.com',
      department: 'Engineering',
      isAdmin: true
    });

    const org2 = await Organization.create({
      name: 'Design Studio',
      email: 'hello@designstudio.com',
      department: 'Creative',
      isAdmin: false
    });

    console.log('Creating users...');
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@techcorp.com',
      password: 'password123',
      role: 'admin',
      organization: org1._id
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@techcorp.com',
      password: 'password123',
      role: 'member',
      organization: org1._id
    });

    const user3 = await User.create({
      name: 'Bob Johnson',
      email: 'bob@designstudio.com',
      password: 'password123',
      role: 'admin',
      organization: org2._id
    });

    org1.users.push(user1._id, user2._id);
    await org1.save();

    org2.users.push(user3._id);
    await org2.save();

    console.log('Creating stores...');
    const store1 = await Store.create({
      name: 'Tech Store',
      description: 'Latest tech gadgets',
      link: 'https://techstore.example.com',
      isPrivate: false,
      user: user1._id
    });

    const store2 = await Store.create({
      name: 'Design Resources',
      description: 'Design templates and assets',
      link: 'https://designresources.example.com',
      isPrivate: true,
      user: user3._id
    });

    const orgCount = await Organization.countDocuments();
    const userCount = await User.countDocuments();
    const storeCount = await Store.countDocuments();

    console.log('Database seeded successfully!');
    console.log(`Created ${orgCount} organizations`);
    console.log(`Created ${userCount} users`);
    console.log(`Created ${storeCount} stores`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
