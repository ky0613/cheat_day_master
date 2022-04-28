class Api::RakutenRecipesController < ApplicationController
  def index
    response_json = RakutenApiClient.get_recipes(params[:category_id])
    render json: response_json
  end
end
