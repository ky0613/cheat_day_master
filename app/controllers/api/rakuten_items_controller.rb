class Api::RakutenItemsController < ApplicationController
  def index
    response_json = RakutenWebService::Ichiba::Genre[params[:food_genre_id]].ranking.each {|ranking| ranking}
    render json: response_json
  end
end
