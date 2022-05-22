class Api::StoresController < ApplicationController
  before_action :authenticate!

  def index
    @stores = current_user.stores.all
    render json: @stores
  end

  def create
    @store = Store.new(store_params)
    if @store.save
      render json: @store
    else
      render json: @store.errors, status: :bad_request
    end
  end

  def destroy
    @store = current_user.stores.find(params[:id])
    @store.destroy!
    render json: @store
  end

  private

  def store_params
    params.require(:store).permit(:store_id, :img_url, :name, :address, :rating, :total_ratings, :store_url,
                                  :store_type).merge(user_id: current_user.id)
  end
end

# class CreateStores < ActiveRecord::Migration[6.1]
#   def change
#     create_table :stores do |t|
#       t.string :store_id, null: false
#       t.string :img_url, null: false
#       t.string :name, null: false
#       t.string :address
#       t.integer :rating
#       t.integer :total_ratings
#       t.string :store_url
#       t.string :store_type, null: false
#       t.references :user, null: false, foreign_key: true

#       t.timestamps
#     end
#   end
# end
