import React, { useState } from 'react';

const RecipeForm = ({ generateRecipe }) => {
  const [dishType, setDishType] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mainIngredients, setMainIngredients] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [servings, setServings] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [cookingMethod, setCookingMethod] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [errors, setErrors] = useState({});

  const recipeData = {
    dishType,
    cuisine,
    mainIngredients,
    dietaryRestrictions,
    allergies,
    servings,
    cookingTime,
    cookingMethod,
    flavorProfile,
    specialOccasion,
  };


  const isValidRequiredFields = () => {
    const newErrors = {};

    if (!dishType) newErrors.dishType = "Dish type is required";
    if (!cuisine) newErrors.cuisine = "Cuisine is required";
    if (!mainIngredients) newErrors.mainIngredients = "Main ingredients are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidRequiredFields()) {
      generateRecipe(recipeData);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
      <form data-testid="recipe-form" onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(errors).length > 0 && (
          <div className="text-red-600 mb-4">
            Please fill in all required fields
          </div>
        )}
        <div>
          <label htmlFor="dishType" className="block text-sm font-medium text-gray-700">*Dish Type:</label>
          <select
            id="dishType"
            value={dishType}
            onChange={(e) => setDishType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">*Cuisine:</label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>

        <div>
          <label htmlFor="mainIngredients" className="block text-sm font-medium text-gray-700">*Main Ingredients:</label>
          <input
            type="text"
            id="mainIngredients"
            value={mainIngredients}
            onChange={(e) => setMainIngredients(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">Dietary Restrictions:</label>
          <input
            type="text"
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies:</label>
          <select
            id="allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Servings:</label>
          <select
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">Cooking Time:</label>
          <select
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookingMethod" className="block text-sm font-medium text-gray-700">Cooking Method:</label>
          <select
            id="cookingMethod"
            value={cookingMethod}
            onChange={(e) => setCookingMethod(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="baking">Baking</option>
            <option value="boiling">Boiling</option>
            <option value="microwaving">Microwaving</option>
          </select>
        </div>

        <div>
          <label htmlFor="flavorProfile" className="block text-sm font-medium text-gray-700">Flavor Profile:</label>
          <select
            id="flavorProfile"
            value={flavorProfile}
            onChange={(e) => setFlavorProfile(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="sweet">Sweet</option>
            <option value="salty">Salty</option>
            <option value="bitter">Bitter</option>
          </select>
        </div>

        <div>
          <label htmlFor="specialOccasion" className="block text-sm font-medium text-gray-700">Special Occasion:</label>
          <select
            id="specialOccasion"
            value={specialOccasion}
            onChange={(e) => setSpecialOccasion(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
