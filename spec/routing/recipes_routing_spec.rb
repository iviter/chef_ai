require "rails_helper"

RSpec.describe Api::V1::RecipesController, type: :routing do
  describe "routing" do
    xit "routes to #index" do
      expect(get: "/recipes").to route_to("recipes#index")
    end

    xit "routes to #create" do
      expect(post: "/recipes").to route_to("recipes#create")
    end
  end
end
