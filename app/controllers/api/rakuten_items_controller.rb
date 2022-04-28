class Api::RakutenItemsController < ApplicationController
  def index
    response_json = RakutenApiClient.get_items(params[:food_genre_id])
    render json: response_json
  end
end
