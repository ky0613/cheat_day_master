require 'securerandom'

FactoryBot.define do
  factory :store do
    store_id { SecureRandom.uuid }
    sequence(:img_url) { |n| "TEST_IMAGE_URL_#{n}" }
    sequence(:name) { |n| "TEST_NAME_#{n}" }
    sequence(:address) { |n| "TEST_ADDRESS_#{n}" }
    raiting { rand(3..5) }
    total_ratings { rand(1000..2000) }
    sequence(:store_url) { |n| "TEST_STORE_URL_#{n}" }
    store_type { ['google', 'hotpepper', 'yelp'].sample }
    association :user
  end
end

# create_table "stores", force: :cascade do |t|
  #   t.string "store_id", null: false
  #   t.string "img_url", null: false
  #   t.string "name", null: false
  #   t.string "address"
  #   t.integer "rating"
  #   t.integer "total_ratings"
  #   t.string "store_url"
  #   t.string "store_type", null: false
  #   t.integer "user_id", null: false
  #   t.datetime "created_at", precision: 6, null: false
  #   t.datetime "updated_at", precision: 6, null: false
  #   t.index ["user_id"], name: "index_stores_on_user_id"
  # end
