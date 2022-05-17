class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.reset_password_email.subject
  #
  def reset_password_email(user)
    @user = User.find user.id
    @url  = "#{Settings.site.top_url}users/password/edit?token=#{user&.reset_password_token}"
    mail(:to => user.email,
        :subject => "パスワードの変更について")
  end
end
