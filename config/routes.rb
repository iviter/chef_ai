Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'recipes/search', to: 'recipes#search'
    end
  end
end
