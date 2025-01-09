import './App.css';
import RecipeList from './components/RecipeGenerator/RecipeList';
import { useState } from 'react';
import RecipeForm from './components/RecipeGenerator/RecipeForm';
import generateRecipe from './components/api/apiService'

const App = () => {
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const handleGenerateRecipe = async (recipeData) => {
    await generateRecipe(recipeData, setRecipe, setLoading, setError); 
  };

  return (
    <div className="App">
      <h1>Generate your recipe here:</h1>
      <RecipeForm generateRecipe={handleGenerateRecipe} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && <RecipeList recipeText={recipe} /> }
    </div>
  );
};

export default App;
