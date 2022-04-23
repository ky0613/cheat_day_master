class CreateDigressions < ActiveRecord::Migration[6.1]
  def change
    create_table :digressions do |t|
      t.text :description

      t.timestamps
    end
  end
end
