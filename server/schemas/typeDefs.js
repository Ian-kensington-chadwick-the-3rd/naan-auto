const typeDefs =`
  type Car {
    _id: ID
    Year: Int!
    Make: String!
    Mileage: Int!
    Description: String
    Trans: String
  }


  type Query {
    Cars: [Car]
  }

  type Mutation {
    addCar(Year: Int!, Make: String!, Mileage: Int!, Description:String, Trans: String): Car
    deleteCar(carId: ID!): Car
  }
`;

module.exports = typeDefs;