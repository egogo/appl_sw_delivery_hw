class CreateEventLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :event_locations do |t|
      t.string :name
      t.string :address
      t.string :state
      t.string :postal_code
      t.string :country
      t.timestamps
    end
  end
end
