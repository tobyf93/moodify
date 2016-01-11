class AddAnalyze < ActiveRecord::Migration
  def change
    create_table :analyze do |t|
      t.string :session_id
      t.text :data
    end
  end
end
