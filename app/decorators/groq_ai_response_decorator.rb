class GroqAiResponseDecorator
  DEFAULT_MESSAGE = 'Something went wrong. Please try again!'.freeze

  def initialize(response)
    @response = response
  end

  def message
    response_message || DEFAULT_MESSAGE
  end

  def to_lowercase
    response_message.downcase
  end

  private

  attr_reader :response

  def response_message
    response.dig('choices', 0, 'message', 'content')
  end
end
