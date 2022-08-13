"use strict";

class Todo {
  static #idSequence = 0;

  #getID() {
    Todo.#idSequence += 1;
    return Todo.#idSequence;
  }

  constructor(title, month, year, description) {
    this.id = this.#getID();
    this.completed = false;
    this.title = title;
    this.month = month;
    this.year = year;
    this.description = description;
  }

  isWithinMonthYear(month, year) {
    if (this.month === month && this.year === year) {
      return true;
    } else {
      return false;
    }
  }
}


let todoList = (function() {
  let allTodos = [];

  function getTargetTodo(id) {
    return allTodos.filter(item => item.id === id)[0];
  }

  return {
    add(title, month, year, description) {
      let array = [].slice.call(arguments);
      let length = array.length;
      if ((length === 4) && (array.every(item => typeof item === 'string'))) {
        let newTodo = new Todo(title, month, year, description);
        allTodos.push(newTodo);
        return true;
      } else {
        return `Error: Please make sure all arguments are strings.`;
      }
    },

    delete(id) {
      let targetTodo = getTargetTodo(id);
      let index = allTodos.indexOf(targetTodo);
      if (index !== -1) {
        allTodos.splice(index, 1);
        return true;
      } else {
        return false;
      }
    },

    initialize(todosArray) {
      if (allTodos.length > 0) {
        return `Error: You may only initilize when list is empty.`;
      } else {
        todosArray.forEach(obj => {
          let newTodo = new Todo(...Object.values(obj));
          allTodos.push(newTodo);
        });
        return true;
      }
    },

    update(id, prop, value) {
      if (prop === 'id') {
        return `Error: Unable to change id. Please try a different attribute.`;
      }

      let targetTodo = getTargetTodo(id);
      if (!targetTodo) {
        return `Error: Todo not found.`;
      } else if (!(targetTodo.hasOwnProperty(prop))) {
        return `Error: Unable to update a non-existing attribute.`;
      } else {
        targetTodo[prop] = value;
        return true;
      }
    },

    getTodoItem(id) {
      let targetTodo = getTargetTodo(id);
      if (targetTodo) {
        return {...targetTodo}; // Returns a copy of the target Todo object
      } else {
        return false;
      }
    },

    getAll() {
      let serializedArr = JSON.stringify(allTodos);
      let deepCopiedArr = JSON.parse(serializedArr);
      return deepCopiedArr; // Returns a deep copy of `allTodos`
    },

  };
})();


let todoManager = {
  showAll() {
    return todoList.getAll();
  },

  showCompleted() {
    return this.showAll().filter(item => item.completed === true);
  },

  inMonthYear(month, year) {
    return this.showAll().filter(item => {
      return Todo.prototype.isWithinMonthYear.call(item, month, year);
    });
  },

  completedInMonthYear(month, year) {
    return this.showCompleted().filter(item => {
      return Todo.prototype.isWithinMonthYear.call(item, month, year);
    });
  },

};


// TESTS:

// Given data:
let todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

let todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

let todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

let todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

// Data placed in array:
let todoSet = [todoData1, todoData2, todoData3, todoData4];


console.log('------------------------------INITIALIZE-----------------------');
// Initialize array of data
todoList.initialize(todoSet);

// Check to see if we now have an array of Todo objects
console.log(todoList.getAll()); // Logs an array of four Todo objects

// Check to see if error message occurs if we initialize when list is not empty
console.log(todoList.initialize(todoSet)); // Logs 'Error: You may only initilize when list is empty.'


console.log('------------------------------ADD TODO-------------------------');
// Use the `add` method to create a new Todo object
// and add it to the todoList
todoList.add('Wash Car', '1', '2022', 'Wash the Car.');

// Check to see if we added a new Todo object
console.log(todoList.getAll()); // Logs and array of five Todo objects

// Try to add a new Todo, but arguments are not all strings (error)
console.log(todoList.add('Buy Food', 1, 1997, 'Buy the food.')); // Logs 'Error: Please make sure all arguments are strings.'
console.log(todoList.add('Buy Pizza', undefined, NaN)); // Logs 'Error: Please make sure all arguments are strings.'
console.log(todoList.add('Buy Pizza')); // Logs 'Error: Please make sure all arguments are strings.'


console.log('------------------------------DELETE TODO----------------------');
// Delete the Todo object with id `4`
console.log(todoList.delete(4) === true); // logs true
// Delete the Todo object with id `3`
console.log(todoList.delete(3) === true); // logs true

// Delete an object that does not exist
console.log(todoList.delete(100) === false); // logs true

// Check to see if Todo object with id `4` exists
console.log(todoList.getTodoItem(4) === false); // logs true

// Check to see if Todo object with id `3` exists
console.log(todoList.getTodoItem(3) === false); // logs true

// Check to see if we have three object remaining
console.log(todoList.getAll()); // Logs remaining three Todo objects (ids 1, 2, 5)


console.log('------------------------------UPDATE TODO----------------------');
// Update a object that is not on the list (error)
console.log(todoList.update({Invalid: true}, 'invalid', 100)); // logs 'Error: Todo not found.'

// Update for property that does not exist (error)
console.log(todoList.update(5, 'quantity', 100)); // logs 'Error: 'Unable to update a non-existing attribute.'

// Update id (this should not be allowed) (error)
console.log(todoList.update(5, 'id', 100)); // logs 'Error: Unable to change id. Please try a different attribute.'

// Update data appropriately (success)
console.log(todoList.getTodoItem(2).month === ''); // logs true, value of 'month' property is ''
console.log(todoList.update(2, 'month', '1')); // logs true, updates 'month' property to '1'
console.log(todoList.getTodoItem(2).month === '1'); // logs true, value of 'month' property is now '1'
console.log(todoList.update(2, 'completed', true)); // logs true
console.log(todoList.getTodoItem(2).completed === true); // logs true, value of 'completed' property is now `true`
console.log(todoList.update(5, 'completed', true)); // logs true
console.log(todoList.getTodoItem(5).completed === true); // logs true, value of 'completed' property is now `true`

// Check that our Todo objects have been updated
console.log(todoList.getAll()); // logs updated todoList (ids 1, 2, 5)


console.log('------------------------------RETURN A TODO, GIVEN ID----------');
// Return false if list does not contain a Todo object with specified id
console.log(todoList.getTodoItem(3) === false); // logs true

// Return a sepcified Todo object, given id
console.log(todoList.getTodoItem(1)); // logs 'Buy Milk' Todo Object

// Test that `getTodoItem` does not directly change property of a Todo object
// *Note: `getTodoItem` returns a copy of the Todo object
todoList.getTodoItem(5).title = 'Zippity do da';
console.log(todoList.getTodoItem(5)); // logs 'Wash Car' Todo object with title unchanged


console.log('todoManager ---------------------------------------------------');
// Return all todo objects
console.log('------------------------------ALL------------------------------');
console.log(todoManager.showAll()); // Returns array of existing Todo objects (ids 1, 2, 5)

// Return all completed todo objects
console.log('------------------------------COMPLETED------------------------');
console.log(todoManager.showCompleted()); // Returns array of completed Todo objects (ids 2, 5)

// Return all todo objects within a given month-year combination
console.log(`-------------------------------IN MONTH ('1') AND YEAR ('2017')`);
console.log(todoManager.inMonthYear('1', '2017')); // Returns array of todo objects (ids 1, 2)

// Return all completed todo objects within a given month-year combination
console.log(`------------------COMPLETED && IN MONTH ('1') AND YEAR ('2017')`);
console.log(todoManager.completedInMonthYear('1', '2017')); // Returns an array with Todo object (id 2)


console.log(`------------------------------ADDITIONAL TESTS-----------------`);
// Additional Tests
// Ensure user must use interface to change/update todoList and Todo objects
// Does not allow users or other objects to manipulate the
// values of Todo objects directly

// Try to directly access private todoList
console.log(todoList.allTodos); // logs undefined

// Try to directly access private todoList from a copy of a Todo object
console.log(todoList.getTodoItem(1).allTodos); // logs undefined

// Try to change the property of a Todo object on the todoList
console.log(todoList.getTodoItem(1).completed = 'Never'); // logs 'Never'
console.log(todoList.getAll()); // Notice that todoList is unchanged

// Try to push a object to the todoList
console.log(todoList.getAll().push({invalid: true})); // logs 4

// Try to change title of a Todo Object using `getAll`
todoList.getAll()[0].title = 'GO TO HAWAII';

// Log all objects on todoList
console.log(todoList.getAll()); // Notice the todoList remains unchanged

// Try to change the id of a Todo data
todoData1.title = 'Boooooooooooo';
console.log(todoList.getAll()); // Notice the todoList remains unchanged
