FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "TEST_NAME#{n}" }
    sequence(:email) { |n| "TEST#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end

# create_table "users", force: :cascade do |t|
#   t.string "name", null: false
#   t.string "email"
#   t.string "crypted_password"
#   t.string "salt"
#   t.datetime "created_at", precision: 6, null: false
#   t.datetime "updated_at", precision: 6, null: false
#   t.string "twitter_id"
#   t.string "reset_password_token"
#   t.datetime "reset_password_token_expires_at"
#   t.datetime "reset_password_email_sent_at"
#   t.integer "access_count_to_reset_password_page", default: 0
#   t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
# end
