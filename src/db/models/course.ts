import { Model, DataTypes, CreationOptional } from 'sequelize';

import { sequelize } from '../database.connection';

export class Course extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Course.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, timestamps: true, paranoid: true })