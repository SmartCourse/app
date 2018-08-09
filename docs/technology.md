# Technology/Stack Options

## Static Prerendered
Essentially you precompile the entire app into static javascript, html and css, which is just fetched by the client. No server required, although needs to be hosted somewhere.

**Advantages**
* Quick to get going
    * Can quickly show a prototype
    * Can deliver and test simple functionality, UX
* Very _agile_ as we can strap on a lot of the frontend to a backend later if need be
* Technology agnostic

**Disadvantages**
* Doesn't allow for extended functionality
* No application state
* Too simple

## Basic Server Side Rendered
![Web App](https://www.scnsoft.com/blog-pictures/web-apps/web_application_architecture-02.png)
This is the traditional web application setup. Basically request comes in from user, then render a page based on passed in parameters. Backend in charge of everything, client just displays the page.

**Advantages**
* Simple overall architecture
    * Familiar to most
* Fulfills full brief. Can do everything required through this structure
* Technology agnostic, (Django, Rust, node.js all options..)

**Disadvantages**
* Slightly poorer UX, because requires full rerender for updates to application state.

## REST API + Single Page Application or REST App Server Rendererd
![ClientSide](https://cdn-images-1.medium.com/max/1600/1*CRiH0hUGoS3aoZaIY4H2yg.png)
This is the a twist on the traditional web application setup. Rather than rendering routes directly we use the RESTful structure. And communicate with a richer client side application. The client (ie the browser) then gets all relevant data it needs once it's loaded, and makes API requests to make changes.

**Advantages**
* Simple overall architecture
* Mixed technology stack, better UX, sort of jack of all trades approach
* Still fairly technology agnostic although does require a more involved frontend architecture (ie a js framework).

**Disadvantages**
* Have to wire up API to frontend which adds complexity.
* Have to manage frontend state which adds complexity.
* Slightly slower first render as application must load assets on client.

## Server Side Rendered, Client Side Hydrated

Modern server side rendering (with integration of a dynamic frontend framework) works like each of the below:

![SSR](https://cdn-images-1.medium.com/max/2000/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

![SSR](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

Highest order of application complexity but also closest to real world scenario. This is quite opinionated about technology, you basically need a node server OR a server able to spawn a node process to run the server side render, then send what's called 'hydrating' data to the client.

## Summary

One thing about all of these is there is plenty of decent boiler-plate out there so initial setup and what not isn't that complex, necessarily.
That said mindful of everyone feeling comfortable and able to contribute.
