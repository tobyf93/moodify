class AddRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.string :session_id
      t.text :data
    end
  end
end
