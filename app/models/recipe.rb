class Recipe < ApplicationRecord
  belongs_to :user
  validates :recipe_id, :img_url, :title, :recipe_url, presence: true
end
