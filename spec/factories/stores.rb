require 'securerandom'

FactoryBot.define do
  factory :store do
    store_id { SecureRandom.uuid }
    sequence(:img_url) { |n| "TEST_IMAGE_URL_#{n}" }
    sequence(:name) { |n| "TEST_NAME_#{n}" }
    sequence(:address) { |n| "TEST_ADDRESS_#{n}" }
    rating { rand(3..5) }
    total_ratings { rand(1000..2000) }
    sequence(:store_url) { |n| "TEST_STORE_URL_#{n}" }
    store_type { ['google', 'hotpepper', 'yelp'].sample }
    association :user
  end
end
