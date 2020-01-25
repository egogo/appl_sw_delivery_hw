class EventLocation < ApplicationRecord
  has_many :events

  validates_presence_of :name, :address, :city, :postal_code, :country, :state

  def full_address
    [self.address, self.city, self.state, self.postal_code, self.country].reject(&:blank?).join(', ')
  end
end
