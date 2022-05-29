require 'rails_helper'

RSpec.describe "Stores", type: :request do
  let(:store)

  before do
    login(store.user)
  end

  describe "GET /api/stores" do
    it "ログインしているユーザーのストアの一覧を取得できる" do
      get api_stores_path
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /api/stores" do
    it "storeを追加できる" do
      post api_stores_path(params: store)
      expect(response).to have_http_status(200)
    end
  end

  describe "DELETE /api/stores/:id" do
    it "storeを削除できる" do
      delete api_stores_path
      expect(response).to have_http_status(200)
    end
  end
end
