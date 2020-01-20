class EventLocation < ApplicationRecord
  has_many :events

  validates_presence_of :name, :address, :postal_code, :country
  validates_presence_of :state, if: Proc.new {|r| r.country == "USA" }

  def full_address
    [self.address, self.state, self.postal_code, self.country].reject(&:blank?).join(', ')
  end
end
