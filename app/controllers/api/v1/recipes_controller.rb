class Api::V1::RecipesController < ApplicationController
  def search
    recipe = ::RecipeGeneratorService.new(recipe_params.to_h).call

    if ::RecipeValidator.new(recipe.message).valid_recipe?
      render json: recipe.message, status: :ok
    else
      render json: { error: 'Failed to generate a valid recipe. Please select appropriate ingredients and try again.' },
                     status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:dishType, :cuisine, :mainIngredients, :dietaryRestrictions, :specialOccasion,
                                   :allergies, :servings, :cookingTime, :cookingMethod, :flavorProfile)
  end
end
