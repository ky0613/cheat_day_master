class Api::RecipesController < ApplicationController

  def index
    @recipes = current_user.recipes.all
    render json: @recipes
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      render json: @recipe
    else
      render json: @recipe.errors, status: :bad_request
    end
  end

  def destroy
    @recipe = current_user.recipes.find(params[:id])
    @recipe.destroy!
    render json: @recipe
  end

  private

  def recipe_params
    params.require(:recipe).permit(:recipe_id, :img_url, :title, :cost, :indication, :recipe_url).merge(user_id: current_user.id)
  end
end
