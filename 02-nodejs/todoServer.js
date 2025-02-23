/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

var todoList=[];
var id=0;
function fetchtodolistFn(req,res){

  if(todoList.length === 0)
  res.status(400).send("List is empty");
  else{
    res.json(todoList);
    res.status(200);
  }
}

function fetchtodolistbyidFN(req,res){

  const todo = todoList.find(obj => obj.id === parseInt(req.params.id));

  if(todo){
    res.json(todo);
    res.status(200);
  }else{
    res.status(400).send("No data found");
  }

}

function addTodoInTheListFn(req,res){
  id=id+1;
  const obj = {
      id:id,
      title:req.body.title,
      completed:req.body.completed,
      description:req.body.description
  };
  todoList.push(obj);
  res.status(200).send("Element added successfully");
}

function updateItemByIdFn(req,res){
     var todoToUpdate = null;
  for(var i=0;i<todoList.length;i++){
      if(todoList[i].id === parseInt(req.params.id))
          todoToUpdate =i;
  }
  if(todotoUpdate){
     todoList[todoToUpdate].title = req.body.title;
     todoList[todoToUpdate].completed = req.body.title;
     todoList[todoToUpdate].description=req.body.decsription;
     res.json(todoList[todoToUpdate]);
  }
 else{
  res.status(200).send("Invalid Id Entered");
 }
}

function deleteItemByIdFn(req,res){
  var todoIndex = null;
   todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === null) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
}


app.get('/todos',fetchtodolistFn);
app.get('/todos/:id',fetchtodolistbyidFN);
app.post('/todos',addTodoInTheListFn);
app.put('/todos/:id',updateItemByIdFn);
app.delete('/delete:id',deleteItemByIdFn);
app.listen(3000);
// module.exports = app;
