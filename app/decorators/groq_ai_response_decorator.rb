module Decorators
  class GroqAiResponseDecorator
    DEFAULT_MESSAGE = 'Something went wrong. Please try again!'.freeze

    def initialize(response)
      @response = response
    end

    def message
      response.dig('choices', 0, 'message', 'content') || DEFAULT_MESSAGE
    end

    private

    attr_reader :response
  end
end
