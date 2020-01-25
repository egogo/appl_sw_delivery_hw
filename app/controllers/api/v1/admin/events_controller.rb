class Api::V1::Admin::EventsController < Api::V1::Admin::BaseController
  def index
    @events = Event.eager_load(:location).paginate(page: page, per_page: per_page)
    @page = page
    @per_page = per_page
    @total = @events.total_entries
  end

  def show
    @event = Event.find(params[:id])
  end

  def create
    @event = Event.create(event_params)
    if @event.valid?
      render :create
    else
      render :errors, status: 422
    end
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    if @event.valid?
      render status: 204
    else
      render :errors, status: 422
    end
  end

  def destroy
    @event = Event.find(params[:id])
    render json: "",  status: 204 if @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:location_id, :name, :description, :starts, :ends)
  end
end
