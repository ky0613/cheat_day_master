require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  let(:recipe) { create(:recipe) }

  context "GET /api/recipes" do
    example "ログインしているユーザーの登録したレシピの一覧を取得できる" do
      token = login(recipe.user)
      get api_recipes_path, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
    end
  end

  context "POST /api/recipes" do
    example "recipeを追加できる" do
      token = login(recipe.user)
      post api_recipes_path, params: { recipe: { recipe_id: SecureRandom.uuid, img_url: "img_url", title: "test_title", cost: "test_cost", indication: "test_indication", recipe_url: "test_recipe_url" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Recipe.count).to eq(2)
    end

    example "パラメーターが不正でrecipeを追加できない" do
      token = login(recipe.user)
      post api_recipes_path, params: { recipe: { recipe_id: "", img_url: "", title: "", cost: "test_cost", indication: "test_indication", recipe_url: "" } }, headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(400)
      expect(Recipe.count).to eq(1)
    end
  end

  context "DELETE /api/recipes/:id" do
    example "recipeを削除できる" do
      token = login(recipe.user)
      delete api_recipe_path(recipe.id), headers: { Authorization: "Bearer #{token}" }
      expect(response).to have_http_status(200)
      expect(Recipe.count).to eq(0)
    end
  end
end
