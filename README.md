# ChefAI App

Welcome to the **ChefAI App**! 🍳 Your AI-powered assistant for generating delicious recipes. Whether you’re looking for quick meal ideas or want to explore creative culinary dishes, ChefAI is here to help.

## Features
- **🤖 AI-Powered Recipe Generation**  
  Enter your available ingredients, cuisine preferences, or dish type, and ChefAI will generate step-by-step recipes tailored to your input.

- **🌍 Explore Diverse Cuisines**  
  Experiment with a variety of global cuisines, from Italian to Asian, and everything in between.

- **📝 Customizable Ingredients**  
  Modify generated recipes by adding or substituting ingredients for a personalized cooking experience.

- **⚡ Seamless User Experience**  
  Enjoy a clean, intuitive interface designed to make generating recipes fast and enjoyable.

---

## Getting Started

To run the app locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- **Ruby**: `3.3.5`
- **Rails**: `7.2.1.2`
- **Node.js** and **Yarn**: For managing front-end assets

### Installation
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/iviter/chef_ai
   cd chefai

2. **API Integration**:  
   ```bash
   ChefAI uses Groq API for generating recipes. Ensure you have an API key and configure it in the environment variables:
   GROQ_API_KEY=your_api_key_here

3. **Install dependencies**:
   ```bash
   bundle install
   yarn install

4. **Start the server**:
   ```bash
   Back-end: rails s
   Front-end: navigate to client app and run: npm run start

5. **Run unit specs**:
   ```bash
   RSpec: bundle exec rspec spec/
   RTL: npx jest

6. **Open the app in your browser at:**:
   ```bash
   http://localhost:3001/

**Happy cooking with ChefAI! 🍴**
