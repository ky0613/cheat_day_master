class Api::RakutenSweetsController < ApplicationController
  def index
    response_json = RakutenApiClient.get_sweets
    render json: response_json
  end
end
