Rails.application.routes.draw do
  root 'static#index'
  get '/cancel_rsvp/:code', to: 'rsvp_cancellations#cancel', as: :cancellation
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show] do
        post :sign_up, on: :member
      end
      namespace :admin do
        resources :events
        resources :locations
      end
    end
  end
end
