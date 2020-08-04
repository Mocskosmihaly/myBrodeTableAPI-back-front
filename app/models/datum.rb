class Datum < ApplicationRecord
  validates :temperature,:windspeed ,presence: true
end
