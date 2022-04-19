class Api::RakutenRecipesController < ApplicationController
  def index
    response_json = RakutenApiClient.get_recipes
    render json: response_json
  end
end
