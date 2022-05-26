require 'securerandom'

FactoryBot.define do
  factory :authenticate do
    provider { 'twitter' }
    uid { SecureRandom.uuid }
    access_token { SecureRandom.base64(12) }
    access_token_secret { SecureRandom.base64(12) }
    association :user
  end
end

# create_table "authentications", force: :cascade do |t|
#   t.integer "user_id", null: false
#   t.string "provider", null: false
#   t.string "uid", null: false
#   t.datetime "created_at", precision: 6, null: false
#   t.datetime "updated_at", precision: 6, null: false
#   t.string "access_token"
#   t.string "access_token_secret"
#   t.index ["provider", "uid"], name: "index_authentications_on_provider_and_uid"
#   t.index ["user_id"], name: "index_authentications_on_user_id"
# end
