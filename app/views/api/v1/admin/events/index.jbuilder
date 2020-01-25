json.events @events do |event|
  json.id event.id
  json.name event.name
  json.location do
    json.name event.location.name
  end
  json.starts event.starts
  json.ends event.ends
end
json.page  @page
json.per_page @per_page
json.total @events.total_entries
