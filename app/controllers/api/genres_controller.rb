class Api::GenresController < ApplicationController
  before_action :authenticate!

  def index
    genres = Genre.all
    render json: genres
  end
end
