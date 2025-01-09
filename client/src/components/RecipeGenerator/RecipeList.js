import React from "react";
import ReactMarkdown from 'react-markdown'

const RecipeList = ({ recipeText = "" }) => {
  if (!recipeText) {
    return null;
  }

  return (
    <div className="recipeList">
      <h2>Generated Recipe:</h2>
      <section>
        <ReactMarkdown>{recipeText}</ReactMarkdown>
      </section>
    </div>
  );
};

export default RecipeList;
