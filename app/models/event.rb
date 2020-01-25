class Event < ApplicationRecord
  belongs_to :location, class_name: 'EventLocation'
  has_many :event_sign_ups
  validates_presence_of :name, :description, :location
  validates_datetime :starts
  validates_datetime :ends
  validates_datetime :ends, :after => :starts, if: Proc.new {|o| !o.starts.blank? and !o.ends.blank? }
end
