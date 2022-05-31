require 'securerandom'

FactoryBot.define do
  factory :recipe do
    recipe_id { SecureRandom.uuid }
    sequence(:img_url) { |n| "TEST_IMAGE_URL_#{n}" }
    sequence(:title) { |n| "TEST_TITLE_#{n}" }
    sequence(:cost) { |n| "TEST_COST_#{n}" }
    sequence(:indication) { |n| "TEST_INDICATION_#{n}" }
    sequence(:recipe_url) { |n| "TEST_RECIPE_URL_#{n}" }
    association :user
  end
end

# create_table "recipes", force: :cascade do |t|
  #   t.string "recipe_id", null: false
  #   t.string "img_url", null: false
  #   t.string "title", null: false
  #   t.string "cost"
  #   t.string "indication"
  #   t.string "recipe_url", null: false
  #   t.integer "user_id", null: false
  #   t.datetime "created_at", precision: 6, null: false
  #   t.datetime "updated_at", precision: 6, null: false
  #   t.index ["user_id"], name: "index_recipes_on_user_id"
  # end
