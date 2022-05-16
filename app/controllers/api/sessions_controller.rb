class Api::SessionsController < ApplicationController

  def create
    if params[:email]
      user = User.authenticate(params[:email], params[:password])
    else
      user = User.find(params[:id])
      auto_login(user)
    end

    if user
      token = user.create_tokens
      render json: {token: token}
    else
      head :unauthorized
    end
  end
end
