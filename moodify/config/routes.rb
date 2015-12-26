Rails.application.routes.draw do
  root :to => 'pages#index'

  get 'index' => 'pages#index'
  get 'login' => 'pages#login'
end
