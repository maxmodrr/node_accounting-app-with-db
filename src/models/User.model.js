'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    tableName: 'users',
  },
);

const getAll = () => User.findAll();

const getOne = (id) => User.findByPk(id);

const remove = (id) => User.destroy({ where: { id } });

const create = (name) => User.create({ name });

const update = async (name, id) => {
  const updatedUser = await User.update(
    { name },
    { where: { id }, returning: true, silent: true },
  );

  return updatedUser;
};

module.exports = {
  User,
  getAll,
  getOne,
  remove,
  create,
  update,
};
