class CreateData < ActiveRecord::Migration[6.0]
  def change
    create_table :data do |t|
      t.float :temperature
      t.float :windspeed
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
