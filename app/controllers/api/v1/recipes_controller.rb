class Api::V1::RecipesController < ApplicationController
  def index
    @recipes = Recipe.all

    render json: @recipes
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render json: @recipe, status: :created, location: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def search
    response = GroqAiClientResponse.new(recipe_params.to_h).call

    render json: [ response.message ]
  end

  private

  def recipe_params
    params.require(:recipe).permit(:description, :name, :dishType, :cuisine, :mainIngredients, :dietaryRestrictions,
                                   :allergies, :servings, :cookingTime, :cookingMethod, :flavorProfile,
                                   :specialOccasion)
  end
end
