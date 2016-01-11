class DropAnalyze < ActiveRecord::Migration
  def change
    drop_table :analyze
  end
end
