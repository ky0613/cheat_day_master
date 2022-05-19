class Api::CategoriesController < ApplicationController
  before_action :authenticate!

  def index
    categories = Category.all
    render json: categories
  end
end
