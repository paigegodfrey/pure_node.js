const http = require('http');
const Todo = require("./controllers/todo");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const handleError = error => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }

  if (req.url === "/api/todos" && req.method === "GET") {
    const todos = await Todo().getTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  }

  // /api/todos/:id : GET
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const todo = await new Todo().getTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    } catch (error) {
      handleError(error);
    }
  }

  // /api/todos/:id : DELETE
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];
      let message = await new Todo().deleteTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message }));
    } catch (error) {
      handleError(error);
    }
  }

  // /api/todos/:id : UPDATE
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[3];
      let updated_todo = await new Todo().updateTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updated_todo));
    } catch (error) {
      handleError(error);
    }
  }

  // /api/todos/ : POST
  else if (req.url === "/api/todos" && req.method === "POST") {
    let todo_data = await getReqData(req);
    let todo = await new Todo().createTodo(JSON.parse(todo_data));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});

module.exports = app;
