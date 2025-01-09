require 'rails_helper'
require 'ostruct'

RSpec.describe Api::V1::RecipesController, type: :controller do
  describe 'POST #search' do
    subject(:recipe_request) { post :search, params: params }

    let(:default_error_message) do
      'Failed to generate a valid recipe. Please select appropriate ingredients and try again.'
    end

    let(:valid_params) do
      {
        recipe: {
          dishType: 'Pasta',
          cuisine: 'Italian',
          mainIngredients: 'Tomato, Cheese, Basil',
          dietaryRestrictions: 'None',
          specialOccasion: 'None',
          allergies: 'None',
          servings: 4,
          cookingTime: '30 minutes',
          cookingMethod: 'Boil',
          flavorProfile: 'Savory'
        }
      }
    end

    let(:invalid_params) do
      {
        recipe: {
          dishType: 'adnrgw',
          cuisine: 'adsad',
          mainIngredients: 'erwfded',
          dietaryRestrictions: '',
          specialOccasion: ''
        }
      }
    end

    let(:empty_params) do
      {
        recipe: {
          dishType: '',
          cuisine: '',
          mainIngredients: '',
          dietaryRestrictions: ''
        }
      }
    end

    context 'when the recipe is valid' do
      let(:params) { valid_params }

      it 'returns success response with the recipe message' do
        VCR.use_cassette('groq_api_valid_params') do
          recipe_request

          expect(response).to have_http_status(:ok)
          expect(response.body).to include('Classic Italian Tomato and Basil Pasta Recipe')
        end
      end
    end

    context 'when the recipe is invalid' do
      let(:params) { invalid_params }

      it 'returns an error response' do
        VCR.use_cassette('groq_api_invalid_params') do
          recipe_request

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)['error']).to eq default_error_message
        end
      end
    end

    context 'when empty parameters are passed' do
      let(:params) { empty_params }

      it 'returns an error response' do
        VCR.use_cassette('groq_api_empty_params') do
          recipe_request

          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)['error']).to eq default_error_message
        end
      end
    end
  end
end
