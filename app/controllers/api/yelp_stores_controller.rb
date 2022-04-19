class Api::YelpStoresController < ApplicationController
  def index
    response_json = YelpApiClient.get_stores(params[:lat], params[:lng])
    render json: response_json
  end
end
