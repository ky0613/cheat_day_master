class ApplicationController < ActionController::Base
  include Api::ExceptionHandler
  include Api::UserAuthenticator
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  private

  def set_csrf_token
    cookies['CSRF-TOKEN'] = {
      domain: Settings.default_url_options.host,
      value: form_authenticity_token
    }
  end
end
