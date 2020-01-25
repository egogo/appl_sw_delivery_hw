json.signups @signups do |signup|
  json.id signup.id
  json.email signup.email
  json.creation_date signup.created_at
end
json.page  @page
json.per_page @per_page
json.total @total
