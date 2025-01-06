import React from "react";

const Recipes = ({ recipes = [] }) => {

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>Name: {recipe.name}</h2>
          <h3>Description: {recipe.description}</h3>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
