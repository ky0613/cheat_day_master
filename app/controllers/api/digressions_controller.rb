class Api::DigressionsController < ApplicationController
  def index
    array = Digression.all
    @digressions = array.shuffle.slice(0, 4)
    render json: @digressions
  end
end
