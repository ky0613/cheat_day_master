require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /api/users" do

    it "パラメーターが正常" do
      post api_users_path(params: { user: { name: "test1", email: "test@example.com", password: "password", password_confirmation: "password" } })
      expect(response).to have_http_status(200)
      expect(1).to eq(User.count)
    end

    it "パラメーターが名前とメールアドレスが不正" do
      post api_users_path(params: { user: { name: "", email: "", password: "password", password_confirmation: "password" } })
      expect(response).to have_http_status(404)
      expect(0).to eq(User.count)
    end

    it "パラメーター内のパスワードが不正" do
      post api_users_path(params: { user: { name: "test1", email: "test@example.com", password: "", password_confirmation: "" } })
      expect(response).to have_http_status(404)
      expect(0).to eq(User.count)
    end
  end
end
