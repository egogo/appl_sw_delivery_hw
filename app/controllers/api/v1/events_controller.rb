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
    event = Event.find(params[:id])
    @signup = event.event_sign_ups.create(email: params[:email])

    if @signup.valid?
      render :sign_up
    else
      render :errors, status: 422
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
