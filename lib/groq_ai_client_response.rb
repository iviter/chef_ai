class GroqAiClientResponse
  BASE_URL = 'https://api.groq.com/openai/v1/chat/completions'.freeze
  DEFAULT_MESSAGE = { 'message' => 'Please provide step-by-step recipe for a dish based on the provided ingredients' }

  def initialize(input, model = 'llama-3.3-70b-versatile')
    @input = filter(input)
    @model = model
  end

  def call
    Decorators::GroqAiResponseDecorator.new(response)
  end

  private

  attr_reader :input, :model, :http_response

  def filter(input)
    input
      .reject { |_, v| v.blank? }
      .merge(DEFAULT_MESSAGE)
      .map { |k, v| "#{k}: #{v}" }
      .join(', ')
  end

  def response
    Retryable.retryable(tries: 5) do
      @http_response ||= HTTParty.post(BASE_URL, headers: headers, body: body.to_json)

      if http_response.success?
        http_response.parsed_response
      else
        { error: http_response['error'] || http_response.message, code: http_response.code }
      end
    end
  rescue StandardError => e
    { error: e.message }
  end

  def headers
    { 'Authorization' => "Bearer #{ENV['GROQ_API_KEY']}", 'Content-Type' => 'application/json' }
  end

  def body
    { messages: [ { role: 'user', content: input } ], model: model }
  end
end
