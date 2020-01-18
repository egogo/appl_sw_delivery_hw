class V1::EventsController < ApplicationController
  def index
    # sort by most recent with start date >= today first
    render :json => {
        events: [],
        pages: 1,
        per_page: 10
    }
  end

  def show

  end

  def sign_up

  end
end
