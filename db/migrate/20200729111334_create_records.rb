class CreateRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :records do |t|
      t.text :description
      t.integer :time
      t.string :effect
      t.string :path
      t.references :template, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
