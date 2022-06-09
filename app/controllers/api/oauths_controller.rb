class Api::OauthsController < ApplicationController

  def oauth
    url = sorcery_login_url(auth_params[:provider])
    oauth_token = html.slice(/oauth_token=.*/).gsub(/oauth_token=/, '')
    render json: oauth_token
  end

  def callback
    user_hash = TwitterApiClient.new(auth_params[:oauth_token], auth_params[:oauth_verifier]).access_token

    if @user = User.find_by(twitter_id: user_hash["user_id"])
      token = @user.authentications.find_by(provider: auth_params[:provider])
      auto_login(@user) if token.decrypt_access_token_and_login?(user_hash)
    else
      create_user_from_oauth(user_hash)
    end
    render json: @user
  end

  private

  def auth_params
    params.permit(:code, :provider, :oauth_token, :oauth_verifier)
  end

  def create_user_from_oauth(user_hash)
    @user = User.new(twitter_id: user_hash["user_id"], name: user_hash["screen_name"])
    @user.authentications.build(provider: auth_params[:provider],
                                access_token: user_hash["oauth_token"],
                                access_token_secret: user_hash["oauth_token_secret"],
                                uid: user_hash["user_id"])
    @user.save!
    reset_session
    auto_login(@user)
  end
end
