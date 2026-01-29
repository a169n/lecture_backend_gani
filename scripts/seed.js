require('dotenv').config();

const mongoose = require('mongoose');
const connectToDatabase = require('../database');
const Organization = require('../models/Organization');
const User = require('../models/User');
const Store = require('../models/Store');

const seed = async () => {
  await connectToDatabase();

  await Promise.all([Organization.deleteMany({}), User.deleteMany({}), Store.deleteMany({})]);

  const organizations = await Organization.create([
    { name: 'Acme Corp', email: 'contact@acme.test', department: 'Engineering', isAdmin: true },
    { name: 'Northwind Labs', email: 'hello@northwind.test', department: 'Research' }
  ]);

  const users = await User.create([
    {
      name: 'Ava Admin',
      email: 'ava.admin@acme.test',
      password: 'password123',
      role: 'admin',
      organization: organizations[0]._id
    },
    {
      name: 'Noah Member',
      email: 'noah.member@acme.test',
      password: 'password123',
      role: 'member',
      organization: organizations[0]._id
    },
    {
      name: 'Liam Researcher',
      email: 'liam.researcher@northwind.test',
      password: 'password123',
      role: 'member',
      organization: organizations[1]._id
    }
  ]);

  await Organization.updateOne(
    { _id: organizations[0]._id },
    { $set: { users: [users[0]._id, users[1]._id] } }
  );
  await Organization.updateOne(
    { _id: organizations[1]._id },
    { $set: { users: [users[2]._id] } }
  );

  await Store.create([
    {
      name: 'Acme Internal Tools',
      description: 'Internal productivity apps and workflows.',
      link: 'https://tools.acme.test',
      isPrivate: true,
      user: users[0]._id
    },
    {
      name: 'Member Starter Kit',
      description: 'Starter resources for new members.',
      link: 'https://resources.acme.test',
      user: users[1]._id
    },
    {
      name: 'Northwind Research Portal',
      description: 'Research datasets and knowledge base.',
      link: 'https://research.northwind.test',
      user: users[2]._id
    }
  ]);

  console.log('Database seeded successfully.');
};

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
  })
  .finally(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
