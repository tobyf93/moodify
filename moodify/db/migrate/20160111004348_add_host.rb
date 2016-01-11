class AddHost < ActiveRecord::Migration
  def change
    remove_column :requests, :session_id
    add_column :requests, :ip_address, :string
  end
end
