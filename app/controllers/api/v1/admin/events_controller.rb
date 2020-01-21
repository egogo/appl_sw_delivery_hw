class Api::V1::Admin::EventsController < ApplicationController
  def index
    @events = Event.eager_load(:location).paginate(page: page, per_page: per_page)
  end

  def create
    @event = Event.create(event_params)
  end

  def update
    @event = Event.find(params[:event_id])
    @event.update_attributes(event_params)
  end

  def destroy
    @event = Event.find(params[:event_id])
    @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:location_id, :name, :description, :starts, :ends)
  end
end
