Rails.application.routes.draw do
  root 'static#index'
  get '/cancel_rsvp/:code', to: 'rsvp_cancellations#cancel', as: :cancellation
  get '/admin', to: 'static#admin', as: :admin
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show] do
        post :sign_up, on: :member
      end
      namespace :admin do
        resources :events do
          resources :signups, only: [:index, :create, :destroy], controller: "event_signups"
        end
        resources :locations, only: [:index, :create, :destroy]
      end
    end
  end
end
