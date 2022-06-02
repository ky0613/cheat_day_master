require 'rails_helper'

RSpec.describe "Stores", type: :request do
  let(:store) { create(:store) }

  context "GET /api/stores" do
    example "ログインしているユーザーの登録したストアの一覧を取得できる" do
      token = login(store.user)
      get api_stores_path, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
    end
  end

  context "POST /api/stores" do
    example "storeを追加できる" do
      token = login(store.user)
      post api_stores_path, params: { store: {store_id: SecureRandom.uuid, img_url: "img_url", name: "test_name", address: "test_adress", rating: 4, total_ratings: 1699, store_url: "test_store_url", store_type: "google" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Store.count).to eq(2)
    end

    example "パラメーターが不正でstoreを追加できない" do
      token = login(store.user)
      post api_stores_path, params: { store: {store_id: "", img_url: "", name: "test_name", address: "test_adress", rating: 4, total_ratings: 1699, store_url: "test_store_url", store_type: "" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(400)
      expect(Store.count).to eq(1)
    end
  end

  context "DELETE /api/stores/:id" do
    example "storeを削除できる" do
      token = login(store.user)
      delete api_store_path(store.id), headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Store.count).to eq(0)
    end
  end
end
