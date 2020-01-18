require 'faker'

FactoryBot.define do
  factory :location, class: EventLocation do
    name { Faker::TvShows::RickAndMorty.location }
    address { Faker::Address.street_address }
    state { Faker::Address.state_abbr }
    postal_code { Faker::Address.postcode }
    country { Faker::Address.country }
  end

  factory :event do
    name { Faker::Movie.quote }
    description { Faker::TvShows::BojackHorseman.quote }
    starts { Faker::Date.between(from: 2.days.from_now, to: 1.year.from_now) }
    ends { Faker::Date.between(from: starts+1.day, to: starts+1.year) }
  end
end