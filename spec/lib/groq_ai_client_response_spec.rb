require 'rails_helper'

RSpec.describe GroqAiClientResponse do
  subject(:client_response) { described_class.new(input, model) }

  let(:input) { 'Generate a recipe for pasta' }
  let(:model) { 'llama-3.3-70b-versatile' }
  let(:error_message) { 'Something went wrong. Please try again!' }

  describe '#call' do
    context 'when the API call is successful' do
      it 'returns correct decorated response' do
        VCR.use_cassette('groq_api_success') do
          result = client_response.call

          expect(result).to be_a(GroqAiResponseDecorator)
          expect(result.message).to include('Classic Spaghetti with Tomato and Basil Sauce Recipe')
        end
      end

      it 'calls HTTParty post method' do
        expect(HTTParty).to receive(:post).exactly(3).times

        VCR.use_cassette('groq_api_success') do
          client_response.call
        end
      end

      it 'calls Retryable class logic' do
        expect(Retryable).to receive(:retryable)

        VCR.use_cassette('groq_api_success') do
          client_response.call
        end
      end
    end

    context 'when the API call fails' do
      before do
        allow(ENV).to receive(:[]).and_call_original
        allow(ENV).to receive(:[]).with('GROQ_API_KEY').and_return('invalid_key')
      end

      it 'handles unsuccessful API responses gracefully', :vcr do
        VCR.use_cassette('groq_api_error') do
          result = client_response.call

          expect(result.message).to eq error_message
        end
      end
    end

    context 'when a StandardError is raised' do
      before { allow(HTTParty).to receive(:post).and_raise(StandardError.new('Connection timed out')) }

      it 'return correct error message' do
        VCR.use_cassette('groq_api_exception') do
          result = client_response.call

          expect(result).to be_a(GroqAiResponseDecorator)
          expect(result.message).to eq error_message
        end
      end
    end
  end
end
