class Api::RakutenRecipesController < ApplicationController
  def index
    category = RakutenWebService::Recipe.large_categories.find { |c| c.id.match(params[:category_id]) }
    response_json = category.ranking
    render json: response_json
  end
end
