require 'rails_helper'

RSpec.describe "Items", type: :request do
  let(:item) { create(:item) }

  context "GET /api/items" do
    example "ログインしているユーザーの登録したアイテムの一覧を取得できる" do
      token = login(item.user)
      get api_items_path, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
    end
  end

  context "POST /api/items" do
    example "itemを追加できる" do
      token = login(item.user)
      post api_items_path, params: { item: { item_id: SecureRandom.uuid, img_url: "img_url", name: "test_name", shop_name: "test_shop_name", price: 3980, rating: 4, total_ratings: 1493, item_url: "test_item_url", item_type: "item" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Item.count).to eq(2)
    end

    example "パラメーターが不正でitemを追加できない" do
      token = login(item.user)
      post api_items_path, params: { item: { item_id: "", img_url: "", name: "", shop_name: "", price: 3980, rating: 4, total_ratings: 1493, item_url: "test_item_url", item_type: "item" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(400)
      expect(Item.count).to eq(1)
    end
  end

  context "DELETE /api/items/:id" do
    example "itemを削除できる" do
      token = login(item.user)
      delete api_item_path(item.id), headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Item.count).to eq(0)
    end
  end
end
