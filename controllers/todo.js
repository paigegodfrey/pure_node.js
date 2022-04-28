const data = require("../data");

class Todo {
  static async getTodos() {
    return new Promise((resolve, reject) => resolve(data));
  }

  static async getTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));
      if (!todo) reject(`Todo with id ${id} not found `);
      resolve(todo);
    });
  }

  static async createTodo(todo) {
    return new Promise((resolve, reject) => {
      let newTodo = {
        id: data.length + 1,
        ...todo,
      };

      resolve(newTodo);
    });
  }

  static async updateTodo(id){
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));
      if (!todo) reject(`No todo with id ${id} found`);
      todo["completed"] = true;
      resolve(todo);
    });
  }

  static async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));
      if (!todo) reject(`No todo with id ${id} found`);
      resolve(`Todo deleted successfully`);
    });
  }
}

module.exports = Todo;
