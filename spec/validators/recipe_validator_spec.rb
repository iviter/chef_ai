require 'rails_helper'

RSpec.describe RecipeValidator do
  subject(:validator) { described_class.new(recipe) }

  let(:recipe) { 'Step 1: Preheat the oven. Step 2: Mix the ingredients.' }
  let(:default_prompt) do
    "Please validate the following text and confirm whether it is a valid step-by-step recipe: #{recipe}. Respond " \
    'with true if it is a valid recipe, or false otherwise'
  end

  before { allow_any_instance_of(GroqAiClientResponse).to receive(:call).and_return(mock_response) }

  describe '#valid_recipe?' do
    context 'when the recipe is valid' do
      let(:mock_response) { instance_double(GroqAiResponseDecorator, to_lowercase: 'true') }

      it 'returns true' do
        expect(validator.valid_recipe?).to be true
      end
    end

    context 'when the recipe is invalid' do
      let(:mock_response) { instance_double(GroqAiResponseDecorator, to_lowercase: 'false') }

      it 'returns false' do
        expect(validator.valid_recipe?).to be false
      end
    end
  end
end
