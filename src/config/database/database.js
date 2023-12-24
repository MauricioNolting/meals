import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate(envs.DB_URI);
    console.log('DB is ok Authenticated/conected 🙌');
  } catch (error) {
    console.log(error);
  }
};

export const synced = async () => {
  try {
    await sequelize.sync();
    console.log('Conection has been synced! 🙌');
  } catch (error) {
    console.log(error);
  }
};
