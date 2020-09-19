import mocker from "mocker-data-generator";

interface IUser {
  id: number;
  _id: number;
  uuid: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  username: string;
  date: Date;
}

export default class Mock {
  private readonly data = {
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
      firstName: { faker: "name.firstName" },
      lastName: { faker: "name.lastName" },
      username: {
        function: function() {
          return this.object.firstName.toLowerCase();
        },
      },
      date: { faker: "date.past" },
    },
  };

  get user(): IUser {
    return mocker().schema("data", this.data.user, 1).buildSync().data[0];
  }
}
