require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  let(:user)

  describe "POST /api/users" do
    it 'ログイン画面の表示に成功すること' do
      post api_users_path(user)
      expect(response).to have_http_status(200)
    end
  end
end
