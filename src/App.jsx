import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  // State for todos and input
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
        setFilterTodos(JSON.parse(storedTodos));
      } catch (e) {
        console.error("Failed to parse todos from localStorage:", e);
      }
    }
  }, []);

  // Save todos to localStorage whenever the todo list changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Add a new todo
  const handleEnterPress = (event, buttonType) => {
    if (event.key === "Enter" && buttonType === "add") {
      addTodo();
    } else if (event.key === "Enter" && buttonType === "search") {
      console.log("Search is clicked.");
      handleSearch();
    }
  };

  // Add todo
  const addTodo = () => {
    // Generate Random Id
    const randomNumber = Math.random();
    const id = Math.floor(randomNumber * 100000000000000);

    if (input.trim()) {
      const newTodos = [...todos, { id: id, text: input, completed: false }];
      setTodos(newTodos);
      setFilterTodos(newTodos);
      setInput("");
    }
  };

  // Toggle completion status of a todo
  const toggleComplete = (id) => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const updatedTodos = storedTodos.map((todo) => {
      if (todo.id === id) {
        // console.log(todo.completed)
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setFilterTodos(updatedTodos);
    console.log(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    console.log(id);
    // Retrieve the current list of todos from localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    // Filter out the todo with the given id
    const updatedTodos = storedTodos.filter((todo) => todo.id !== id);

    // Save the updated todos back to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // Update todos on UI
    setTodos(updatedTodos);
    setFilterTodos(updatedTodos);
  };

  // Handle Search
  const handleSearch = () => {
    // Filter todos based on the search term
    const filteredTodos = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Set Filtered Todos
    setFilterTodos(filteredTodos);
    console.log(filteredTodos);
  };

  

  return (
    <div className="bg-[url('https://i.ibb.co.com/1843wbf/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp')] bg-cover bg-center min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all duration-300 transform">
        <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Todo List
        </h1>

        {/* Add todo */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="w-full p-3 text-white bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all placeholder-gray-400"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => handleEnterPress(e, "add")}
          />
          <button
            onClick={addTodo}
            className="ml-3 px-5 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 hover:shadow-lg transition-all"
          >
            Add
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="w-full p-3 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all placeholder-gray-400 text-white"
            placeholder="Search tasks..."
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => handleEnterPress(e, "search")}
          />
          <button
            onClick={handleSearch}
            className="ml-3 px-5 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 hover:shadow-lg transition-all"
          >
            Search
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {filterTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md bg-black text-white bg-opacity-50 backdrop-blur-md
              }`}
            >
              <span
                className={`text-white ${
                  todo.completed
                    ? "line-through text-green-600"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all"
                >
                  {todo.completed ? "Incomplete" : "Completed"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
