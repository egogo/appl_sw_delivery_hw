class UserSignupNotificationMailer < ApplicationMailer
  def signup_confirmation
    @event = params[:event]
    @reservation = params[:reservation]
    @user_email = params[:user_email]
    @reservation_cancelation_url = cancellation_url(@reservation.get_code)

    @cal = Icalendar::Calendar.new
    @cal.event do |e|
      e.dtstart = @event.starts
      e.dtend = @event.ends
      e.summary = @event.name
      e.organizer = "mailto:#{Rails.configuration.signup_notification_email}"
      e.organizer = Icalendar::Values::CalAddress.new(@event.location.full_address, cn: @event.location.name)
      e.description = @event.description
    end
    mail.attachments['event.ics'] = { mime_type: 'text/calendar', content: @cal.to_ical }

    mail(to: @user_email, subject: "You've signed up for \"#{@event.name}\"!")
  end
end
