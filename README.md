## Prerequisites

- [Git](https://git-scm.com/)
- ~~[MySQL](https://www.mysql.com/)~~ MondoDB

Option one

- [Node.js](https://nodejs.org/)
- Node.js framework of your choice (i.e. [Loopback](https://loopback.io/))

Option two

- [Ruby](https://www.ruby-lang.org/)
- Ruby framework of your choice (i.e. [Ruby on Rails](https://rubyonrails.org/))

**Pizzeria**

The application serves the purpose of ordering pizza online.

The following entities should be created (including proper relations):

- _pizza type_ - has a name and price (e.g. Margherita $5, Pepperoni $6, ...)
- _order_ - has items
- _order item_ - has a pizza type and quantity

On the homepage, list of orders with total prices should be shown.

On a "Create Order" screen, the user can select pizza types and amounts, add to the order, see current total, and place (save) the order.

Additionally, the following JSON API should be provided:

- list of orders
- details of an individual order
