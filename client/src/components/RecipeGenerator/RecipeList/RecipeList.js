import React from 'react';
import ReactMarkdown from 'react-markdown';

const RecipeList = ({ recipeText = '' }) => {
  if (!recipeText) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Generated Recipe:
      </h2>
      <section className="prose max-w-none text-gray-700">
        <ReactMarkdown>{recipeText}</ReactMarkdown>
      </section>
    </div>
  );
};

export default RecipeList;
