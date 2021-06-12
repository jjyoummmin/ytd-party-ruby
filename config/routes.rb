Rails.application.routes.draw do  
  get '/' => 'render#welcome'
  get 'login' => 'render#login', :as => 'login'
  get 'home' => 'render#home'
  get 'chat' => 'render#chat' 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
