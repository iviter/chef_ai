import RecipeList from './components/RecipeGenerator/RecipeList';
import { useState } from 'react';
import RecipeForm from './components/RecipeGenerator/RecipeForm';
import generateRecipe from './components/api/apiService';

const App = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const handleGenerateRecipe = async (recipeData) => {
    await generateRecipe(recipeData, setRecipe, setLoading, setError);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-1 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-1">Generate Your Recipe:</h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <RecipeForm generateRecipe={handleGenerateRecipe} />
        {loading && <p className="text-center text-blue-500 font-medium mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 font-medium mt-4">{error}</p>}
        {!loading && <RecipeList recipeText={recipe} />}
      </div>
    </div>
  );
};

export default App;
