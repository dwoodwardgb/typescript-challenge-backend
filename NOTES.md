# Architecture

I've spent years wondering about the ideal 3-layered architecture for backends (controller, service, mapper, dependency injection, etc.). Then one day I came across a Clojure tutorial where they simply had a global db connection, and passed that as the first argument to their “mapper” functions rather than using a class, DI, or factory functions. The simplicity was so refreshing that I’ve never looked back, and I try to avoid creating too much architecture in my Node projects. If a team however is really familiar with the class-based DI architecture, then Nest.js is a good choice.

I like how I set up the middleware, most Node tutorials end up being a lot of spaghetti code where all the middleware are configured in one file. This is difficult to read because some of the middleware have one-time local variables that pollute the file scope. By separating each middleware to its own file you hide those local variables and allow yourself to easily skim their order in “middleware/index.ts”.

# Types

I know types were asked for, but I didn’t implement types on the business objects out of laziness. All the node server is doing is wrapping Mongo, so if we write a lot of code to enforce the structure of the data in Node, then every time we want to change that structure we have to update the Node code, but if we keep the data handling code dynamic, then we can change the data shape without having to change the server code. If there were requirements around security (like excluding certain fields from being inserted in documents) then I would recommend that we use types and some kind of ORM. But for this exercise we were only reading, not inserting.

# Project Setup

I borrowed from some other repos I’ve made for node in the past
https://github.com/dwoodwardgb/repository-pattern-in-node
https://github.com/dwoodwardgb/node-monolith-starter
