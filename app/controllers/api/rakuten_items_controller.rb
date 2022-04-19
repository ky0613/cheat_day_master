class Api::RakutenItemsController < ApplicationController
  def index
    response_json = RakutenApiClient.get_items
    render json: response_json
  end
end
