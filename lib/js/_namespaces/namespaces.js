var Aggregate = function() {
  this.Entities = {};
  this.Commands = {};
};

HotelApp = {
  Aggregates: {},
  Integrations: {},
  Schemas: {},
  Events: new EventEmitter() // https://atmospherejs.com/raix/eventemitter,
};

PlusMore = {
  Services: {}
}

Schema = {};
