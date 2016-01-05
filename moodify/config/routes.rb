Rails.application.routes.draw do
  root :to => 'pages#index'

  get '/index' => 'pages#index'
  get '/analyze' => 'pages#analyze'
  post '/analyze' => 'pages#analyze'
  get '/auth/spotify/callback' => 'pages#index'
end
