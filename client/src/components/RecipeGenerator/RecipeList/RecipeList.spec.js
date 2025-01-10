import React from 'react';
import { render } from '@testing-library/react';
import RecipeList from './RecipeList';

describe('RecipeList', () => {
  it('renders the recipe text correctly', () => {
    const recipeText = '## Delicious Dish\nThis is a tasty recipe!';
    const { getByText } = render(<RecipeList recipeText={recipeText} />);

    expect(getByText(/Delicious Dish/i)).toBeInTheDocument();
    expect(getByText(/This is a tasty recipe!/i)).toBeInTheDocument();
  });

  it('does not render anything when recipeText is empty', () => {
    const { queryByText } = render(<RecipeList recipeText="" />);

    expect(queryByText(/Generated Recipe:/i)).not.toBeInTheDocument();
  });

  it('renders correct structure', () => {
    const recipeText = '## Recipe with Ingredients\n- Flour\n- Water';
    const { getByText } = render(<RecipeList recipeText={recipeText} />);

    expect(getByText(/Generated Recipe:/i)).toBeInTheDocument();
    expect(getByText(/Recipe with Ingredients/i)).toBeInTheDocument();
    expect(getByText(/Flour/i)).toBeInTheDocument();
    expect(getByText(/Water/i)).toBeInTheDocument();
  });
});
