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
