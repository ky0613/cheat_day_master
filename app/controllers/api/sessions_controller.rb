class Api::SessionsController < ApplicationController

  def index
    set_csrf_token
    render json: {}, status: :ok
  end

  def create
    if params[:email]
      user = User.authenticate(params[:email], params[:password])
    else
      user = User.find(params[:id])
      auto_login(user)
    end

    raise ActiveRecord::RecordNotFound unless user

    token = user.create_tokens
    render json: {token: token}
  end
end
