class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :store_id, null: false
      t.string :img_url, null: false
      t.string :name, null: false
      t.string :address
      t.integer :rating
      t.integer :total_ratings
      t.string :store_url
      t.string :store_type, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
