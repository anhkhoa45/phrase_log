class CreatePhrases < ActiveRecord::Migration[5.2]
  def change
    create_table :phrases do |t|
      t.string :pharse
      t.string :mean
      t.integer :user_id

      t.timestamps
    end
  end
end
