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
            throw new Error(`error on date`)
          }
        }
      }
    }
  },{
    sequelize,
    modelName: 'Todo'
  })
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};