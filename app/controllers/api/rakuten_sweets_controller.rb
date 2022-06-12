class Api::RakutenSweetsController < ApplicationController

  def index
    response_json = RakutenWebService::Ichiba::Genre[params[:sweet_genre_id]].ranking.each {|ranking| ranking}
    render json: response_json
  end
end
