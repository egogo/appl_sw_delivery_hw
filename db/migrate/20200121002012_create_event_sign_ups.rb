class CreateEventSignUps < ActiveRecord::Migration[6.0]
  def change
    create_table :event_sign_ups do |t|
      t.belongs_to :event
      t.string :email
      t.timestamps
    end

    add_index :event_sign_ups, [:event_id, :email], unique: true
  end
end
