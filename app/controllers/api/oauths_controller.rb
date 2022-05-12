class Api::OauthsController < ApplicationController

  def oauth
    login_at(auth_params[:provider])
  end

  def callback
    provider = auth_params[:provider]
    if (user = login_from(provider))
      render json: user
    else
      user = create_from(provider)
      reset_session
      auto_login(user)
      render json: user
    end
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end
end
