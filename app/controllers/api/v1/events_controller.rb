class Api::V1::EventsController < ApplicationController
  def index
    @events = Event.eager_load(:location).where("starts >= ?", Date.today)
                   .order('starts ASC').paginate(page: page, per_page: per_page)
    @page = page
    @per_page = per_page
    @total = @events.total_entries
  end

  def show
    @event = Event.eager_load(:location).find(params[:id])
  end

  def sign_up
    @event = Event.find(params[:id])

    begin
      @event.sign_up_email!(params[:email])
      render json: { ok: true, error: nil }, status: 201
    rescue Event::UserAlreadySignedUp
      render json: { ok: false, error: 'already_signed_up' }, status: 422
    rescue Event::InvalidEmail
      render json: { ok: false, error: 'invalid_email' }, status: 422
    end
  end

  private
  def page
    (params[:page] || 1).to_i
  end

  def per_page
    (params[:per_page] || 10).to_i
  end
end
