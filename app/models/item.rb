class Item < ApplicationRecord
  belongs_to :user
  validates :item_id, :img_url, :name, :shop_name, :item_type, presence: true
end
