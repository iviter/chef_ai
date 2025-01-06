import './App.css';
import axios from 'axios';
import Recipies from './components/recipes';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/v1/recipes';

const getApiData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const data = await getApiData();
      if (mounted) {
        setRecipes(data);
      }
    };

    fetchData();

    return () => { (mounted = false) };
  }, []);

  return (
    <div className="App">
      {recipes.length > 0 && <Recipies recipes={recipes}/> }
    </div>
  );
};

export default App;
