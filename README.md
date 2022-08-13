# Todo List App

## Description

This is an application that allows you to keep track of things you need to do.

## Usage

The primary interface to initialize, add, delete, update, and retreive `Todo` objects are on the `todoList` object.
* *initialize* - The `initialize` method takes an array of objects as an argument (assuming that the private collection `allTodos` is empty and that each object is in the correct format i.e. each object should contain properties of `title`, `month`, `year`, `description` and thier values must be strings). If the private collection `allTodos` is not empty then it will return `Error: You may only initilize when list is empty.` Otherwise, for each object in the array, the `initialize` method uses the values of each object to instantiate a `Todo object` and pushes that `Todo object` to a private collection referenced by `allTodos` that is only accessible through the `todoList` interface. Returns `true` if successful initialization.

* *add* - The `add` method takes four string arguments (the `title`, `month`, `year`, and `description` of the todo to be added). It validates to ensure that we have four arguments and that they are all strings. Then it takes those strings and instantiates a new `Todo` object and pushes it to the private collection to `Todo` objects referenced by `allTodos`. Returns `true` if successful addition occurs, and returns `Error: Please make sure all arguments are strings.` otherwise.

* *delete* - The `delete` method takes a id number as an argument to find the `Todo` object to be deleted. The reason that this method takes an id number rather than any other property is becuase, while other properties can be changed and may not be unique, the `id` property on Todo objects will *always* be unique and *cannot* be changed. (See implementation of the `update` method for further details). Returns `true` if item is found and subsequently deleted, returns `false` otherwise.

* *update* - The `update` method takes an `id` (as a number), `prop` (as a string), and `value` (as as string). The `id` is used to retrieve the target `Todo` item we wish to update. If the `prop` argument is the string `'id'`; this will return the error, `Error: Unable to change id. Please try a different attribute.` This is to ensure that the unique identifier cannot be changed. If the current collection of `Todo` objects does not have the specified `id` then it will return `Error: Todo not found.` If the `Todo` object is found but the property, `prop`, is not a property on the `Todo` object then it will return `Error: Unable to update a non-existing attribute.` Otherwise it will update the specified `Todo` object accordingly.

* *getTodoItem* - The `getTodoItem` method takes an `id` (as a number). It simply searches for a matching `Todo` object with that `id` number in the private collection `allTodos`; if found it returns a copy of it, otherwise it returns `false`. The reason why we are returning a copy of the `Todo` object is because this will help prevent unauthorized changes to the objects in our private collection. (We only want to make changes to our `Todo` objects and our private collection referenced by `allTodos`, through the intended interface).

* *getAll* - The `getAll` method returns a `deep copy` of our private collection referenced by `allTodos`. A deep copy is needed because we have a nested collection (in other words, if we only implemented a shallow copy, the objects in our private collection would be mutated, just as the copy is mutated). We prevent this by returning a deep copy!


The `todoManager` interfaces with the `todoList` object. It has methods that query the `todoList` to return all or a subset of the todo objects as an array of todo objects.

* *showAll* - The *showAll* method returns a deep copy array of the private collection referenced by `allTodos`.

* *showCompleted* - The *showCompleted* method returns only the completed items on the array returned by `showAll`.

* *inMonthYear* - The *inMonthYear* method takes two string arguments `month` and `year`. It uses the `Function.prototype.call()` method to "borrow" the `isWithinMonthYear`  method on `Todo`. Here, we return a filtered array where only `Todo` objects that match the given `month` and `year` are present.

* *completedInMonthYear* - Similar to *inMonthYear* method, except we also want the `Todo` objects in the return array to be completed. It also uses the `Function.prototype.call()` method to "borrow" the `isWithinMonthYear`  method on `Todo`. Returns an array with those `Todo` objects that are `completed`, and in the specified `month` and `year`.

## Additional Notes:

Of significance, the application does not allow modification of `Todo` objects on the private collection referenced by `allTodos` except via the intended interface; Nor can the private collection `allTodos` be alterted execpt via the intended interface.

Additionally, the `id` property for each `Todo` object have a unique number, which cannot be altered. The `id` numbers are assigned upon instantation. The numbers increase sequentially and are kept track of as a private, static property of the `Todo` class.

`Todo` objects can only be added to the private collection referenced by `allTodos` via the intended interface (see *initialize* and *add* methods).
