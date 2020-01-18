Rails.application.routes.draw do
  root 'static#index'
  namespace :v1 do
    resources :events, only: [:index, :show] do
      post :sign_up, on: :collection
    end
    namespace :admin do
      resources :events
      resources :locations
    end
  end
end
