# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_09_025736) do

  create_table "categories", force: :cascade do |t|
    t.integer "category_id"
    t.string "category_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "digressions", force: :cascade do |t|
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "genres", force: :cascade do |t|
    t.integer "genre_id"
    t.string "genre_name"
    t.string "genre_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "item_id", null: false
    t.string "img_url", null: false
    t.string "name", null: false
    t.string "shop_name", null: false
    t.integer "price"
    t.integer "rating"
    t.integer "total_ratings"
    t.string "item_url", null: false
    t.string "item_type", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "recipe_id", null: false
    t.string "img_url", null: false
    t.string "title", null: false
    t.integer "cost"
    t.integer "indication"
    t.string "recipe_url", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "store_id", null: false
    t.string "img_url", null: false
    t.string "name", null: false
    t.string "address"
    t.integer "rating"
    t.integer "total_ratings"
    t.string "store_url"
    t.string "store_type", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_stores_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "crypted_password"
    t.string "salt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "items", "users"
  add_foreign_key "recipes", "users"
  add_foreign_key "stores", "users"
end
