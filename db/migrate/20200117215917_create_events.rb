class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.belongs_to :location
      t.string :name
      t.text :description
      t.datetime :starts
      t.datetime :ends
      t.timestamps
    end
  end
end
