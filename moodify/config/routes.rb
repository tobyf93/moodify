Rails.application.routes.draw do
  root :to => 'pages#index'

  get 'index' => 'pages#index'
  get '/auth/spotify/callback' => 'pages#index'
  get 'login' => 'pages#login'
end
