class RecipeValidator
  def initialize(recipe)
    @recipe = recipe
  end

  def valid_recipe?
    response = GroqAiClientResponse.new(default_prompt).call
    response.to_lowercase == 'true'
  end

  private

  attr_reader :recipe

  def default_prompt
    "Please validate the following text and confirm whether it is a valid step-by-step recipe: #{recipe}. Respond " \
    'with true if it is a valid recipe, or false otherwise'
  end
end
