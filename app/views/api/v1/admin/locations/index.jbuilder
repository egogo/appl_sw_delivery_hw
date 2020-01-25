json.items @locations.each do |location|
  json.id location.id
  json.name location.name
  json.address location.full_address
end