import axios from 'axios';

const RECIPE_BASE_URL = process.env.REACT_APP_RECIPE_BASE_URL;
const DEFAULT_ERROR_MESSAGE =
  'Failed to generate valid recipe. Please select appropriate ingredients and try again!';

const generateRecipe = async (data, setRecipe, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await axios.post(`${RECIPE_BASE_URL}/recipes/search`, {
      recipe: data,
    });
    setRecipe(response.data);
    setError(null);
  } catch (error) {
    setError(DEFAULT_ERROR_MESSAGE);
  } finally {
    setLoading(false);
  }
};

export default generateRecipe;
