const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

const seedData = async () => {
  try {
    console.log('Starting pickleball seed data...');

    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // =========================
    // CATEGORIES (Pickleball)
    // =========================
    const categories = await Category.insertMany([
      { name: 'Pickleball Paddles' },
      { name: 'Pickleball Balls' },
      { name: 'Pickleball Shoes' },
      { name: 'Pickleball Bags' },
      { name: 'Pickleball Apparel' },
      { name: 'Accessories' },
    ]);

    console.log('✓ Created pickleball categories');

    // helper
    const cat = (name) => categories.find(c => c.name === name)._id;

    // =========================
    // PRODUCTS
    // =========================
    const products = [
      // Paddles
      {
        name: 'Pro Carbon Fiber Paddle X1',
        price: 180,
        description: 'Lightweight carbon fiber pickleball paddle for advanced players',
        stock: 30,
        category: cat('Pickleball Paddles'),
        images: [],
      },
      {
        name: 'Control Paddle Elite',
        price: 140,
        description: 'Balanced paddle for control and precision',
        stock: 25,
        category: cat('Pickleball Paddles'),
        images: [],
      },
      {
        name: 'Beginner Wood Paddle Set',
        price: 60,
        description: 'Perfect starter set for beginners',
        stock: 50,
        category: cat('Pickleball Paddles'),
        images: [],
      },

      // Balls
      {
        name: 'Outdoor Pickleball (6 pack)',
        price: 20,
        description: 'Durable balls for outdoor courts',
        stock: 100,
        category: cat('Pickleball Balls'),
        images: [],
      },
      {
        name: 'Indoor Pickleball Premium',
        price: 18,
        description: 'Soft bounce balls for indoor play',
        stock: 120,
        category: cat('Pickleball Balls'),
        images: [],
      },

      // Shoes
      {
        name: 'Court Grip Pro Shoes',
        price: 95,
        description: 'High grip shoes designed for pickleball courts',
        stock: 40,
        category: cat('Pickleball Shoes'),
        images: [],
      },
      {
        name: 'Lightweight Court Sneakers',
        price: 70,
        description: 'Comfortable and breathable court shoes',
        stock: 60,
        category: cat('Pickleball Shoes'),
        images: [],
      },

      // Bags
      {
        name: 'Pickleball Backpack Pro',
        price: 55,
        description: 'Spacious backpack for paddles and gear',
        stock: 45,
        category: cat('Pickleball Bags'),
        images: [],
      },
      {
        name: 'Tour Equipment Bag',
        price: 85,
        description: 'Large bag for tournament players',
        stock: 30,
        category: cat('Pickleball Bags'),
        images: [],
      },

      // Apparel
      {
        name: 'Performance Pickleball Shirt',
        price: 25,
        description: 'Sweat-wicking sports shirt',
        stock: 120,
        category: cat('Pickleball Apparel'),
        images: [],
      },
      {
        name: 'Athletic Shorts Pro',
        price: 28,
        description: 'Lightweight shorts for movement',
        stock: 110,
        category: cat('Pickleball Apparel'),
        images: [],
      },

      // Accessories
      {
        name: 'Grip Tape Set',
        price: 12,
        description: 'Replaceable paddle grip tape',
        stock: 200,
        category: cat('Accessories'),
        images: [],
      },
      {
        name: 'Wrist Support Band',
        price: 10,
        description: 'Protective wrist support for players',
        stock: 180,
        category: cat('Accessories'),
        images: [],
      },
      {
        name: 'Sweat Headband',
        price: 8,
        description: 'Comfort sweat-absorbing headband',
        stock: 250,
        category: cat('Accessories'),
        images: [],
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log('✓ Created pickleball products');

    // =========================
    // USERS
    // =========================
    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = await User.insertMany([
      {
        name: 'Admin Pickleball',
        email: 'admin@pickleball.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Player One',
        email: 'player1@pickleball.com',
        password: hashedPassword,
        role: 'user',
      },
      {
        name: 'Player Two',
        email: 'player2@pickleball.com',
        password: hashedPassword,
        role: 'user',
      },
    ]);

    console.log('✓ Created users');

    // =========================
    // ORDERS (same logic)
    // =========================
    const orders = [];
    const statuses = ['NEW', 'CONFIRMED', 'PREPARING', 'SHIPPING', 'DELIVERED'];

    for (let i = 0; i < 5; i++) {
      const user = users[Math.floor(Math.random() * (users.length - 1)) + 1];

      const items = [];
      const productCount = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < productCount; j++) {
        const product = createdProducts[Math.floor(Math.random() * createdProducts.length)];
        const quantity = Math.floor(Math.random() * 2) + 1;

        items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: '',
        });
      }

      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const shippingFee = 5;
      const totalPrice = subtotal + shippingFee;

      const status = statuses[Math.floor(Math.random() * statuses.length)];

      orders.push({
        user: user._id,
        items,
        shippingAddress: {
          fullName: user.name,
          phone: '0123456789',
          address: 'Pickleball Court District, Vietnam',
        },
        subtotal,
        shippingFee,
        totalPrice,
        paymentMethod: 'COD',
        paymentStatus: status === 'DELIVERED' ? 'PAID' : 'PENDING',
        status,
        createdAt: new Date(),
        deliveredAt: status === 'DELIVERED' ? new Date() : null,
      });
    }

    await Order.insertMany(orders);
    console.log('✓ Created sample orders');

    console.log('\n✅ Pickleball seed completed!');
    console.log('Admin: admin@pickleball.com / 123456');
  } catch (error) {
    console.error('Seed error:', error);
  }
};

module.exports = seedData;