'use strict';
const axios = require('axios')
module.exports = (sequelize, DataTypes) => {

    class Todo extends sequelize.Sequelize.Model {}

    Todo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "title is required"
                },
                notEmpty: {
                    args: true,
                    msg: "title is required"
                }

            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "description is required"
                },
                notEmpty: {
                    args: true,
                    msg: "description is required"
                }

            }
        },
        status: DataTypes.BOOLEAN,
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                checkDueDate() {
                    if (this.due_date < new Date()) {
                        throw new Error(`only allow date after current date`)
                    }
                },
                notNull: {
                    args: true,
                    msg: "due date is required"
                },
                notEmpty: {
                    args: true,
                    msg: "due date is required"
                }
            }
        },
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        hooks: {
            beforeCreate: (Todo, options) => {
                Todo.status = false
            }
        },
        modelName: 'Todo'
    })
    Todo.associate = function(models) {
        // associations can be defined here
        Todo.belongsTo(models.User, { foreignKey: 'UserId' })
    };
    return Todo;
};