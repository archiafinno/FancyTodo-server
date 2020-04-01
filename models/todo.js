'use strict';
module.exports = (sequelize, DataTypes) => {

  class Todo extends sequelize.Sequelize.Model {}

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        checkDueDate () {
          if(this.due_date < new Date()) {
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
  },{
    sequelize,
    modelName: 'Todo'
  })
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {foreignKey: 'UserId'})
  };
  return Todo;
};