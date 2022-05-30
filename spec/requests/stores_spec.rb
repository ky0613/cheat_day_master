require 'rails_helper'

RSpec.describe "Stores", type: :request do
  let(:store) { create(:store) }

  before do
    login(store.user)
  end

  context "GET /api/stores" do
    it "ログインしているユーザーのストアの一覧を取得できる" do
      get api_stores_path
      binding.pry
      expect(response).to have_http_status(200)
    end
  end

  context "POST /api/stores" do
    it "storeを追加できる" do
      post api_stores_path(params: {  })
      expect(response).to have_http_status(200)
    end
  end

  context "DELETE /api/stores/:id" do
    it "storeを削除できる" do
      delete api_store_path(store.id)
      expect(response).to have_http_status(200)
    end
  end
end
