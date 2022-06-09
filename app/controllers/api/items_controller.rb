class Api::ItemsController < ApplicationController

  def index
    @items = current_user.items.all
    render json: @items
  end

  def create
    @item = current_user.items.new(item_params)
    if @item.save
      render json: @item
    else
      render json: @item.errors, status: :bad_request
    end
  end

  def destroy
    params[:item_ids].each do |id|
      @item = current_user.items.find(id)
      @item.destroy!
    end
    render json: @item, status: :ok
  end

  private

  def item_params
    params.require(:item).permit(:item_id, :img_url, :name, :shop_name, :price, :rating, :total_ratings, :item_url,
                                :item_type)
  end
end
