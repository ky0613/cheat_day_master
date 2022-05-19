class ApplicationController < ActionController::Base
  # 例外処理を共通化
  include Api::ExceptionHandler
  # 認証処理
  include Api::UserAuthenticator
  # APiモードでのCookieを使用するために読み込む
  include ActionController::Cookies
  # CSRF対策を有効化
  include ActionController::RequestForgeryProtection

  # CSRFエラーを例外として出力させる
  protect_from_forgery with: :exception

  # herokuapp.comから独自ドメインへリダイレクトさせる
  before_action :ensure_domain
  FQDN = 'www.cheatday-master.com'

  def ensure_domain
    return unless /\.herokuapp.com/ =~ request.host

    port = ":#{request.port}" unless [80, 443].include?(request.port)
    redirect_to "#{request.protocol}#{FQDN}#{port}#{request.path}", status: :moved_permanently
  end

  private

  def set_csrf_token
    cookies['CSRF-TOKEN'] = {
      domain: Settings.default_url_options.host,
      value: form_authenticity_token
    }
  end
end
