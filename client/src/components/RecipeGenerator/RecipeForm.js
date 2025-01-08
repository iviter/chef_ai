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

  const handleSubmit = (event) => {
    event.preventDefault();
    generateRecipe(recipeData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dishType">Dish Type:</label>
          <select 
            id="dishType"
            value={dishType}
            onChange={(e) => setDishType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="appetizer">Appetizer</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <div>
          <label htmlFor="cuisine">Cuisine:</label>
          <select 
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>

        <div>
          <label htmlFor="mainIngredients">Main Ingredients:</label>
          <input 
            type="text" 
            id="mainIngredients" 
            value={mainIngredients} 
            onChange={(e) => setMainIngredients(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="dietaryRestrictions">Dietary Restrictions:</label>
          <input 
            type="text" 
            id="dietaryRestrictions" 
            value={dietaryRestrictions} 
            onChange={(e) => setDietaryRestrictions(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="allergies">Allergies:</label>
          <select 
            id="allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="servings">Servings:</label>
          <select 
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookingTime">Cooking Time:</label>
          <select 
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Slow">Slow</option>
            <option value="Fast">Fast</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookingMethod">Cooking Method:</label>
          <select 
            id="cookingMethod"
            value={cookingMethod}
            onChange={(e) => setCookingMethod(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Baking">Baking</option>
            <option value="Boiling">Boiling</option>
            <option value="Microwaving">Microwaving</option>
          </select>
        </div>

        <div>
          <label htmlFor="flavorProfile">Flavor Profile:</label>
          <select 
            id="flavorProfile"
            value={flavorProfile}
            onChange={(e) => setFlavorProfile(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Sweet">Sweet</option>
            <option value="Salty">Salty</option>
            <option value="Bitter">Bitter</option>
          </select>
        </div>

        <div>
          <label htmlFor="specialOccasion">Special Occasion:</label>
          <select 
            id="specialOccasion"
            value={specialOccasion}
            onChange={(e) => setSpecialOccasion(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button type="submit">Generate Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
