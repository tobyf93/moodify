class AddDoneFlag < ActiveRecord::Migration
  def change
    add_column :requests, :done, :boolean, :default => false
  end
end
