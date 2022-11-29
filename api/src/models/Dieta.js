const sequelize = require('sequelize');
const  { Sequelize, DataTypes, Model, UUID, STRING, UUIDV4} = require('sequelize');
const db = require('../db')


module.exports = (sequelize)=>{
    sequelize.define("Dieta",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}