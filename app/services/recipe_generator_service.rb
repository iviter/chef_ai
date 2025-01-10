class RecipeGeneratorService
  DEFAULT_MESSAGE = { 'message' => 'Please provide step-by-step recipe for a dish based on the provided ingredients' }

  def initialize(recipe_params)
    @recipe_params = filter(recipe_params)
  end

  def call
    GroqAiClientResponse.new(recipe_params).call
  end

  private

  attr_reader :recipe_params

  def filter(params)
    params
      .reject { |_k, v| v.blank? }
      .merge(DEFAULT_MESSAGE)
      .map { |k, v| "#{k}: #{v}" }
      .join(', ')
  end
end
