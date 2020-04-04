'use strict';
const axios = require('axios')
module.exports = (sequelize, DataTypes) => {

    class Todo extends sequelize.Sequelize.Model {}

    Todo.init({
        title: DataTypes.STRING,
        description: {
            type: DataTypes.STRING,
            validate: {
                checkMovie() {
                    axios.get(`http://www.omdbapi.com/?apikey=${process.env.apikey}&s=${this.description}`)
                        .then(result => {
                            console.log(result.data.Response)
                            if (result.data.Response == "False") {
                                throw new Error('there is no movie with this name')
                            }
                        })
                }
            }
        },
        status: DataTypes.BOOLEAN,
        due_date: {
            type: DataTypes.DATE,
            validate: {
                checkDueDate() {
                    if (this.due_date < new Date()) {
                        throw new Error(`only allow date after current date`)
                    }
                }
                // checkEmpty() {
                //   if (this.title == '' || this.description == '' || this.status == '' || this.due_date == '' ) {
                //     throw new Error(`Error on Validation`)
                //   }
                // }
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