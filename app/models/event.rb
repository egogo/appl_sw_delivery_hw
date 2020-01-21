class Event < ApplicationRecord
  belongs_to :location, class_name: 'EventLocation'
  has_many :event_sign_ups
  validates_presence_of :name, :description, :location
  validates_datetime :starts
  validates_datetime :ends
  validates_datetime :ends, :after => :starts, if: Proc.new {|o| !o.starts.blank? and !o.ends.blank? }

  def sign_up_email!(email)
    signup = EventSignUp.new(event: self, email: email)
    if signup.valid?
      signup.save

      AdminSignupNotificationMailer.with(
          event: self,
          user_email: email
      ).signup_notification.deliver_later

      UserSignupNotificationMailer.with(
          reservation: signup,
          event: self,
          user_email: email
      ).signup_confirmation.deliver_later

    else
      raise Event::UserAlreadySignedUp if signup.errors.of_kind?(:email, :taken)
      raise Event::InvalidEmail
    end
  end
end

class Event::UserAlreadySignedUp < Exception
end

class Event::InvalidEmail < Exception
end