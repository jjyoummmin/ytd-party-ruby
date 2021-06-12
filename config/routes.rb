Rails.application.routes.draw do  
  root :to => 'welcome#index'
  get 'login' => 'login#show', :as => 'login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
