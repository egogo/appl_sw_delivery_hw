class Event < ApplicationRecord
  # TODO: timezone is not set, we could derive it from event location or set it on the event explicitly
  belongs_to :location, class_name: 'EventLocation'
  validates_presence_of :name, :description, :location
  validates_datetime :starts
  validates_datetime :ends
  validates_datetime :ends, :after => :starts, if: Proc.new {|o| !o.starts.blank? and !o.ends.blank? }

  def sign_up_email(email)
    # add user to events-emails if not yet there
    # send user an email with a calendar invite
  end
end
