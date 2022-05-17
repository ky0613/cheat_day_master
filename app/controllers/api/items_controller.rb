class Api::ItemsController < ApplicationController

  def index
    @items = current_user.items.all
    render json: @items
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      render json: @item
    else
      render json: @item.errors, status: :bad_request
    end
  end

  def destroy
    @item = current_user.items.find(params[:id])
    @item.destroy!
    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:item_id, :img_url, :name, :shop_name, :price, :rating, :total_ratings, :item_url, :item_type).merge(user_id: current_user.id)
  end
end
