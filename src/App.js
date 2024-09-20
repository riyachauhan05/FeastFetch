import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "your_api_key"; // Replace with your API Key

  const handleSearch = async () => {
    if (!ingredient) {
      setError("Please enter an ingredient");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${apiKey}`
      );
      setRecipes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)..."
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />
      <button onClick={handleSearch}>Get Recipes</button>
      {error && <p className="error">{error}</p>}
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <a
              href={`https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
