class Api::RecipesController < ApplicationController

  def index
    @recipes = current_user.recipes.all
    render json: @recipes
  end

  def create
    @recipe = current_user.recipes.new(recipe_params)
    if @recipe.save
      render json: @recipe
    else
      render json: @recipe.errors, status: :bad_request
    end
  end

  def destroy
    params[:recipe_ids].each do |id|
      @recipe = current_user.recipes.find(id)
      @recipe.destroy!
    end
    render json: @recipe, status: :ok
  end

  private

  def recipe_params
    params.require(:recipe).permit(:recipe_id, :img_url, :title, :cost, :indication,
                                  :recipe_url)
  end
end
