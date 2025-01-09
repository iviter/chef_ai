require 'rails_helper'

RSpec.describe GroqAiResponseDecorator do
  subject(:decorator) { described_class.new(response) }

  let(:default_message) { 'Something went wrong. Please try again!' }
  let(:response) do
    {
      'choices' => [ { 'message' => { 'content' => 'Test response' } } ]
    }
  end

  describe 'constant' do
    it 'returns correct message' do
      expect(described_class::DEFAULT_MESSAGE).to eq default_message
    end
  end

  describe '#message' do
    context 'when the response contains message' do
      it 'returns the message content' do
        expect(decorator.message).to eq('Test response')
      end
    end

    context 'when the response does not contain message' do
      let(:response) { {} }

      it 'returns the default message' do
        expect(decorator.message).to eq default_message
      end
    end
  end

  describe '#to_lowercase' do
    context 'when the response contains message' do
      it 'returns message in lowercase format' do
        expect(decorator.to_lowercase).to eq('test response')
      end
    end

    context 'when the response does not contain message' do
      let(:response) { {} }

      it 'returns nil' do
        expect(decorator.to_lowercase).to be_nil
      end
    end
  end
end
