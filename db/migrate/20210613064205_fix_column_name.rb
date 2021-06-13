class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :rooms, :video_url, :video_id
  end
end
