class Api::V1::Admin::LocationsController < Api::V1::Admin::BaseController
  def index
    @locations = EventLocation.all
  end

  def create
    @location = EventLocation.create(location_params)
    render :errors, status: 422 unless @location.valid?
  end

  def destroy
    @location = EventLocation.find(params[:id])
    render json: '', status: 204 if @location.destroy
  end

  private
  def location_params
    params.require(:location).permit(:name, :address, :city, :state, :postal_code, :country)
  end
end
