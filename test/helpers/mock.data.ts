export default {
  user: {
    _idVirtual: {
      incrementalId: 0,
      virtual: true,
    },
    _id: {
      function: function() {
        return this.object._idVirtual;
      },
    },
    id: { faker: "random.number" },
    uuid: { chance: "guid" },
    email: { faker: "internet.email" },
    name: { faker: "name.findName" },
    first_name: { faker: "name.firstName" },
    last_name: { faker: "name.lastName" },
    username: {
      function: function() {
        return this.object.first_name.toLowerCase();
      },
    },
    date: { faker: "date.past" },
  },
};
