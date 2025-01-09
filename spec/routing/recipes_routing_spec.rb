require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :routing do
  describe 'routing' do
    it 'routes to #search' do
      expect(post: '/api/v1/recipes/search').to route_to('api/v1/recipes#search')
    end
  end
end
