Rails.application.routes.draw do
  root to: 'home#index'
  get '*path', to: 'home#index'
  namespace :api do
    resources :rakuten_items, only: %i(index)
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
