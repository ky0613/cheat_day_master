require 'securerandom'

FactoryBot.define do
  factory :item do
    item_id { SecureRandom.uuid }
    sequence(:img_url) { |n| "TEST_IMAGE_URL_#{n}" }
    sequence(:name) { |n| "TEST_NAME_#{n}"}
    sequence(:shop_name) { |n| "TEST_SHOP_NAME_#{n}" }
    price { rand(10000..20000) }
    rating { rand(3..5) }
    total_ratings { rand(1000..2000) }
    sequence(:item_url) { |n| "TEST_ITEM_URL_#{n}" }
    item_type { ['item', 'sweet'].sample }
    association :user
  end
end

  # create_table "items", force: :cascade do |t|
  #   t.string "item_id", null: false
  #   t.string "img_url", null: false
  #   t.string "name", null: false
  #   t.string "shop_name", null: false
  #   t.integer "price"
  #   t.integer "rating"
  #   t.integer "total_ratings"
  #   t.string "item_url", null: false
  #   t.string "item_type", null: false
  #   t.integer "user_id", null: false
  #   t.datetime "created_at", precision: 6, null: false
  #   t.datetime "updated_at", precision: 6, null: false
  #   t.index ["user_id"], name: "index_items_on_user_id"
  # end
