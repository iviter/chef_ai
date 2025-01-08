import './App.css';
import axios from 'axios';
import RecipeList from './components/RecipeGenerator/RecipeList';
import { useState } from 'react';
import RecipeForm from './components/RecipeGenerator/RecipeForm';

const App = () => {
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null); 

  const RECIPE_BASE_URL = process.env.REACT_APP_RECIPE_BASE_URL;
  const DEFAULT_ERROR_MESSAGE = 'Failed to generate valid recipe. Please select appropriate ingredients and try again!'

  const generateRecipe = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${RECIPE_BASE_URL}/recipes/`, { recipe: data });
      setRecipe(response.data);
      setError(null);
    } catch (error) {
      setError(DEFAULT_ERROR_MESSAGE); 
    } finally {
      setLoading(false);
    }
  };

  {loading && <p>Loading...</p>}
  {error && <p className="error">{error}</p>} 

  return (
    <div className="App">
      <h1>Generate your recipe here:</h1>
      <RecipeForm generateRecipe={generateRecipe} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && <RecipeList recipe={recipe} /> }
    </div>
  );
};

export default App;
