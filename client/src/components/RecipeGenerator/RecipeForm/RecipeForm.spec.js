import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeForm from './RecipeForm';

const mockGenerateRecipe = jest.fn();

describe('RecipeForm component', () => {
  beforeEach(() => {
    mockGenerateRecipe.mockClear();
  });

  it('renders form with all fields', () => {
    const { getByLabelText, getByRole } = render(
      <RecipeForm generateRecipe={mockGenerateRecipe} />
    );

    expect(getByLabelText(/Dish Type/i)).toBeInTheDocument();
    expect(getByLabelText(/Cuisine/i)).toBeInTheDocument();
    expect(getByLabelText(/Main Ingredients/i)).toBeInTheDocument();
    expect(getByLabelText(/Dietary Restrictions/i)).toBeInTheDocument();
    expect(getByLabelText(/Allergies/i)).toBeInTheDocument();
    expect(getByLabelText(/Servings/i)).toBeInTheDocument();
    expect(getByLabelText(/Cooking Time/i)).toBeInTheDocument();
    expect(getByLabelText(/Cooking Method/i)).toBeInTheDocument();
    expect(getByLabelText(/Flavor Profile/i)).toBeInTheDocument();
    expect(getByLabelText(/Special Occasion/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows error message when required fields are not filled', async () => {
    const { getByRole, findByText } = render(
      <RecipeForm generateRecipe={mockGenerateRecipe} />
    );

    fireEvent.click(getByRole('button', { name: /Submit/i }));

    expect(
      await findByText(/Please fill in all required fields/i)
    ).toBeInTheDocument();
  });

  it('calls generateRecipe when form is valid', async () => {
    const { getByLabelText, getByRole } = render(
      <RecipeForm generateRecipe={mockGenerateRecipe} />
    );

    fireEvent.change(getByLabelText(/Dish Type/i), {
      target: { value: 'main course' },
    });
    fireEvent.change(getByLabelText(/Cuisine/i), {
      target: { value: 'italian' },
    });
    fireEvent.change(getByLabelText(/Main Ingredients/i), {
      target: { value: 'pasta' },
    });

    fireEvent.click(getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockGenerateRecipe).toHaveBeenCalledWith({
        dishType: 'main course',
        cuisine: 'italian',
        mainIngredients: 'pasta',
        dietaryRestrictions: '',
        allergies: '',
        servings: '',
        cookingTime: '',
        cookingMethod: '',
        flavorProfile: '',
        specialOccasion: '',
      });
    });
  });

  it('does not call generateRecipe when required fields are missing', async () => {
    const { getByRole, getByLabelText } = render(
      <RecipeForm generateRecipe={mockGenerateRecipe} />
    );

    fireEvent.change(getByLabelText(/Dish Type/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/Cuisine/i), {
      target: { value: 'italian' },
    });
    fireEvent.change(getByLabelText(/Main Ingredients/i), {
      target: { value: 'chicken' },
    });

    fireEvent.click(getByRole('button', { name: /Submit/i }));

    expect(mockGenerateRecipe).not.toHaveBeenCalled();
  });

  it('clears errors when valid data is entered after a failed submission', async () => {
    const renderResult = render(
      <RecipeForm generateRecipe={mockGenerateRecipe} />
    );
    const { findByText, getByLabelText, queryByText, getByRole } = renderResult;

    fireEvent.click(getByRole('button', { name: /Submit/i }));

    expect(
      await findByText(/Please fill in all required fields/i)
    ).toBeInTheDocument();

    fireEvent.change(getByLabelText(/Dish Type/i), {
      target: { value: 'main course' },
    });
    fireEvent.change(getByLabelText(/Cuisine/i), {
      target: { value: 'italian' },
    });
    fireEvent.change(getByLabelText(/Main Ingredients/i), {
      target: { value: 'chicken' },
    });

    fireEvent.click(getByRole('button', { name: /Submit/i }));

    expect(queryByText(/Please fill in all required fields/i)).toBeNull();
  });
});
