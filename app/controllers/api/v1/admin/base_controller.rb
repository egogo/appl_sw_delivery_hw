class Api::V1::Admin::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :validate_api_key!

  protected
  def validate_api_key!
    if request.headers['X-Authorization'] != "Bearer #{Rails.application.config.admin_api_token}"
      render json: {error: 'Unauthorized'}, status: :unauthorized
      return
    end
  end

  def page
    (params[:page] || 1).to_i
  end

  def per_page
    (params[:per_page] || 10).to_i
  end

  def record_not_found(error)
    render json: "", status: :not_found
  end

end