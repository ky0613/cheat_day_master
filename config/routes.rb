Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    resources :rakuten_items, only: %i(index)
    resources :rakuten_recipes, only: %i(index)
  end
  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
