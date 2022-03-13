module Api
  module V1
    class ArticlesController < ApplicationController
      def index
        render json: { status: 'SUCCESS' }
      end
    end
  end
end
