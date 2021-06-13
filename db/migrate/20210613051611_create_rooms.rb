class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.string :room_id
      t.string :video_url
      t.string :title
      t.string :host

      t.timestamps
    end
  end
end
