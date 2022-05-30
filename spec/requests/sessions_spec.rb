require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/sessions" do
    context "パラメーターが正常" do
      it "ログインできる" do
        post api_sessions_path(params: { email: user.email, password: "password" })
        expect(response).to have_http_status(200)
      end
    end

    context "パラメーターが不正" do
      it "メールアドレスが空" do
        user
        post api_sessions_path(params: { email: "", password: "password" })
        expect(response).to have_http_status(404)
      end

      it "登録されていないメールアドレスが送信される" do
        user
        post api_sessions_path(params: { email: "spec_test@example.com", password: "password" })
        expect(response).to have_http_status(404)
      end

      it "登録されていないパスワードが送信される" do
        post api_sessions_path(params: { email: user.email, password: "testpassword" })
        expect(response).to have_http_status(404)
      end
    end
  end
end
