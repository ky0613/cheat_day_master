class CreateGenres < ActiveRecord::Migration[6.1]
  def change
    create_table :genres do |t|
      t.integer :genre_id
      t.string :genre_name
      t.string :genre_type

      t.timestamps
    end
  end
end
