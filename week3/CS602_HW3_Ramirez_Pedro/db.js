import { Sequelize } from 'sequelize';

// Connect to SQLite database
const db = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  define: {
    timestamps: false,
  },
  storage: 'hw3db.sqlite',
});

// Export the Sequelize instance
export {db};