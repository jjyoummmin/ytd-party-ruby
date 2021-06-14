Rails.application.routes.draw do  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks',  sessions: 'users/sessions' }
  get '/' => 'render#welcome'
  get 'login' => 'render#login', :as => 'login'
  get 'home' => 'render#home'
  get 'chat' => 'render#chat',  :as => 'chat'

  get 'api/create_room' => 'api#create_room'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
