require 'base64'

class EventSignUp < ApplicationRecord
  belongs_to :event
  validates_presence_of :event_id, :email
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/
  validates_uniqueness_of :email, scope: :event_id

  def get_code
    Base64.urlsafe_encode64("#{event_id}-#{self.id}")
  end

  def self.find_by_code(code)
    begin
      str = Base64.urlsafe_decode64(code)
    rescue ArgumentError => e
      return if e.message == 'invalid base64'
      raise e
    end

    event_id, signup_id = str.split('-')
    where(event_id: event_id, id: signup_id).first
  end
end
