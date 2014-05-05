require 'sinatra'





#Return the list of the food available
get '/foodList.json' do
  return '{

              "food": [
                  {
                      "id": 4,
                      "desc": "marguez"
                  },
                  {
                      "id": 6,
                      "desc": "porc"
                  }
                  ,
                  {
                      "id": 9,
                      "desc": "chicken"
                  },
                  {
                      "id": 2,
                      "desc": "cervelas"
                  }
              ]

          }'
end

#Return the current attendee


post '/joinBBQ' do
    puts ';poc'
end