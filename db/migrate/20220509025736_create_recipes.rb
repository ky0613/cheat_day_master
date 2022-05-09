class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :recipe_id, null: false
      t.string :img_url, null: false
      t.string :title, null: false
      t.integer :cost
      t.integer :indication
      t.string :recipe_url, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
