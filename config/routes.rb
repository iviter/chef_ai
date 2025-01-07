Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes do
        collection do
          post :search
        end
      end
    end
  end
end
