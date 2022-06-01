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
