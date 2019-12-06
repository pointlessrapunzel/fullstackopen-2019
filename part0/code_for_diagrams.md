# part0 exercises

This is the code for creating [websequencediagrams](https://www.websequencediagrams.com/), showing how browser-server request-response process happens in traditional web apps and single page applications. PNGs of these diagrams are in the same directory.

## 0.4: new note

![new note diagram](https://github.com/pointlessrapunzel/fullstackopen-2019/blob/master/part0/0.4.png "0.4 new note diagram")

Following code can be copied into [websequencediagrams](https://www.websequencediagrams.com/):

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note

note over server:
form data is sent with HTTP POST
and is handled by the server
(saved to a JSON file)
end note

server-->browser: HTTP status code 302

note over browser:
  status code 302 means redirect, 
  browser is asked to make a new HTTP GET request
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes  
server-->browser: notes.html  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css  
server-->browser: main.css  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js  
server-->browser: main.js  

note over browser:
  browser executes JS code
  that requests JSON data from server
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json  
server-->browser: data.json  

note over browser:
  browser executes the event handler
  that renders notes to display
end note


## 0.5: Single page app

![SPA diagram](https://github.com/pointlessrapunzel/fullstackopen-2019/blob/master/part0/0.5.png "0.5 SPA diagram")

Following code can be copied into [websequencediagrams](https://www.websequencediagrams.com/):

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa  
server-->browser: spa.html  
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css  
server-->browser: main.css  
browser->server: https://fullstack-exampleapp.herokuapp.com/spa.js  
server-->browser: spa.js  

note over browser:
    JS code parses JSON data from server
end note

browser->server: https://fullstack-exampleapp.herokuapp.com/data.json  
server-->browser: data.json  

note over browser:
    JS code redraws notes in browser
end note

## 0.6: New note

![new note SPA diagram](https://github.com/pointlessrapunzel/fullstackopen-2019/blob/master/part0/0.6.png "0.6 new note SPA diagram")

Following code can be copied into [websequencediagrams](https://www.websequencediagrams.com/):

note over browser
    as user submits the form
    JS code executes,
    creating the submitted note,
    rerendering it on the page, and
    sending it to server as JSON
end note

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa  
server-->browser: status code 201 created

note over server
    server saves posted JSON data
    to a JSON file on server
end note
