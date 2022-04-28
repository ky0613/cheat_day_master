class Api::RakutenSweetsController < ApplicationController
  def index
    response_json = RakutenApiClient.get_sweets(params[:sweet_genre_id])
    render json: response_json
  end
end
