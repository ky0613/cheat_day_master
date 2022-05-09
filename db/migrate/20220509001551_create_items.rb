class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_id, null: false
      t.string :img_url, null: false
      t.string :name, null: false
      t.string :shop_name, null: false
      t.integer :price
      t.integer :rating
      t.integer :total_ratings
      t.string :item_url
      t.string :item_type, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
