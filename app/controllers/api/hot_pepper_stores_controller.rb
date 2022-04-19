class Api::HotPepperStoresController < ApplicationController
  def index
    response_json = HotPepperApiClient.get_stores(params[:lat], params[:lng])
    render json: response_json
  end
end
