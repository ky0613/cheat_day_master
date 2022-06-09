Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  root to: 'home#index'
  namespace :api do
    resources :rakuten_items, only: %i(index)
    resources :rakuten_recipes, only: %i(index)
    resources :rakuten_sweets, only: %i(index)
    resources :hot_pepper_stores, only: %i(index)
    resources :yelp_stores, only: %i(index)
    resources :digressions, only: %i(index)
    resources :genres, only: %i(index)
    resources :categories, only: %i(index)
    resources :stores, only: %i(index create)
    delete :stores, to: 'stores#destroy'
    resources :items, only: %i(index create)
    delete :items, to: 'items#destroy'
    resources :recipes, only: %i(index create)
    delete :recipes, to: 'recipes#destroy'
    resources :sessions
    resources :users do
      collection do
        get 'me'
      end
    end

    # 外部連携ログイン
    post "oauth/callback", to: "oauths#callback"
    get "oauth/:provider", to: "oauths#oauth", as: :auth_at_provider

    # パスワードリセット
    resources :password_resets, only: %i(create update), param: :token
  end
  get '*path', to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
