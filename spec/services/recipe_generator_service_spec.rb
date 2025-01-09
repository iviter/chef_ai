require 'rails_helper'

RSpec.describe RecipeGeneratorService do
  subject(:service) { described_class.new(recipe_params) }

  let(:mock_response) { instance_double(GroqAiClientResponse, call: 'Generated Recipe') }
  let(:default_message) do
    { 'message' => 'Please provide step-by-step recipe for a dish based on the provided ingredients' }
  end
  let(:recipe_params) do
    {
      'cuisine' => 'Italian',
      'dishType' => 'Pasta',
      'mainIngredients' => 'Tomatoes, Garlic, Basil',
      'dietaryRestrictions' => '',
      'specialOccasion' => nil
    }
  end
  let(:filtered_params) do
    'cuisine: Italian, dishType: Pasta, mainIngredients: Tomatoes, Garlic, Basil, '\
    "message: #{default_message['message']}"
  end

  before { allow(GroqAiClientResponse).to receive(:new).with(filtered_params).and_return(mock_response) }

  describe 'constant' do
    it 'returns correct message' do
      expect(described_class::DEFAULT_MESSAGE).to eq default_message
    end
  end

  describe '#call' do
    it 'filters the parameters and calls the GroqAiClientResponse' do
      expect(GroqAiClientResponse).to receive(:new).with(filtered_params)
      expect(mock_response).to receive(:call)

      service.call
    end

    it 'returns the response from GroqAiClientResponse' do
      expect(service.call).to eq('Generated Recipe')
    end
  end
end
