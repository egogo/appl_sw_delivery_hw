class Api::V1::Admin::EventSignupsController < Api::V1::Admin::BaseController
  def index
    @signups = event.event_sign_ups.paginate(page: page, per_page: per_page)
    @page = page
    @per_page = per_page
    @total = @signups.total_entries
  end

  def create
    @signup = event.event_sign_ups.create(event_signup_params)
    if @signup.valid?
      render :create
    else
      render :errors, status: 422
    end
  end

  def destroy
    @signup = event.event_sign_ups.find(params[:id])
    render json: "", status: 204 if @signup.destroy
  end

  private
  def event
    Event.find(params[:event_id])
  end

  def event_signup_params
    params.require(:signup).permit(:email)
  end
end
