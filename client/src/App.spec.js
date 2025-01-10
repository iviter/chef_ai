import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import generateRecipe from './components/api/apiService';

jest.mock('./components/api/apiService');

describe('App', () => {
  it('renders the title and form', () => {
    const { getByText, getByTestId } = render(<App />);
    
    expect(getByText(/Generate Your Recipe:/i)).toBeInTheDocument();
    expect(getByTestId('recipe-form')).toBeInTheDocument();
  });

  it('displays loading state and error message correctly', async () => {
    generateRecipe.mockImplementation((data, setRecipe, setLoading, setError) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setError('Something went wrong');
      }, 1000);
    });
  
    const { getByLabelText, getByText, getByRole } = render(<App />);
  
    fireEvent.change(getByLabelText(/Dish Type/i), { target: { value: 'main course' } });
    fireEvent.change(getByLabelText(/Cuisine/i), { target: { value: 'italian' } });
    fireEvent.change(getByLabelText(/Main Ingredients/i), { target: { value: 'pasta' } });
  
    fireEvent.click(getByRole('button', { name: /Submit/i }));
  
    await waitFor(() => {
      expect(getByText(/Loading.../i)).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('displays recipe after successful API call', async () => {
    generateRecipe.mockImplementation((recipeData, setRecipe) => {
      setRecipe('## Delicious Recipe\nIngredients: Flour, Water');
    });

    const { getByText, getByLabelText, getByRole } = render(<App />);

    fireEvent.change(getByLabelText(/Dish Type/i), { target: { value: 'main course' } });
    fireEvent.change(getByLabelText(/Cuisine/i), { target: { value: 'italian' } });
    fireEvent.change(getByLabelText(/Main Ingredients/i), { target: { value: 'pasta' } });
  
    fireEvent.click(getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(getByText(/Delicious Recipe/i)).toBeInTheDocument();
    });
    expect(getByText(/Ingredients: Flour, Water/i)).toBeInTheDocument();
  });

  it('displays validation error when required fields are missing', async () => {
    const { getByText } = render(<App />);

    fireEvent.submit(screen.getByTestId('recipe-form'));
  
    await waitFor(() => {
      expect(getByText(/Please fill in all required fields/i)).toBeInTheDocument();
    });
  });
});
