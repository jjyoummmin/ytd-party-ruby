class AddEmailToRooms < ActiveRecord::Migration[6.1]
  def change
    add_column :rooms, :host_email, :string
  end
end
