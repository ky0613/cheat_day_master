class User < ApplicationRecord
  include JwtToken
  authenticates_with_sorcery!
  has_many :authentications, dependent: :destroy
  accepts_nested_attributes_for :authentications

  has_many :stores, dependent: :destroy
  has_many :items, dependent: :destroy
  has_many :recipes, dependent: :destroy

  validates :name, presence: true, length: { maximum: 25 }
  validates :email, uniqueness: true, allow_nil: true

  validates :reset_password_token, uniqueness: true, allow_nil: true

  validates :name, presence: true
end
