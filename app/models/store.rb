class Store < ApplicationRecord
  belongs_to :user
  validates :store_id, presence: true
  validates :img_url, presence: true
  validates :name, presence: true
end
