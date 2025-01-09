require 'rails_helper'

RSpec.describe '/recipes', type: :request do
  subject(:api_request) do
    post api_v1_recipes_search_path, params: params, headers: headers, as: :json
  end

  let(:valid_attributes) do
    {
      dishType: 'Main Course',
      cuisine: 'Italian',
      mainIngredients: [ 'Pasta', 'Tomato' ],
      dietaryRestrictions: 'None',
      specialOccasion: 'None',
      allergies: 'None'
    }
  end

  let(:invalid_attributes) { { dishType: nil, cuisine: nil, mainIngredients: [] } }
  let(:valid_headers) { {} }

  describe 'POST /search' do
    context 'with valid parameters' do
      let(:params) { { recipe: valid_attributes  } }
      let(:headers) { valid_headers }

      before do
        VCR.use_cassette('groq_api_search_success') do
          api_request
        end
      end

      it 'returns a successful response with recipe data' do
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including('application/json'))
        expect(response.body).to include('recipe')
      end
    end

    context 'with invalid parameters' do
      let(:params) { { recipe: invalid_attributes  } }
      let(:headers) { valid_headers }
      let(:error_message) { JSON.parse(response.body) }

      before do
        VCR.use_cassette('groq_api_search_failed') do
          api_request
        end
      end

      it 'renders correct error response' do
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
        expect(error_message['error']).to eq('Failed to generate a valid recipe. Please select appropriate '\
          'ingredients and try again.')
      end
    end
  end
end
