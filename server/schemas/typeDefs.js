const typeDefs =`
  type Car {
    _id: ID
    Year: Int!
    Make: String!
    Mileage: Int!
    Description: String
    Trans: String
    imageUrl: [String]
  }


  type Query {
    Cars: [Car]
    findCar(_id: ID!): [Car]
  }

  type Mutation {
    addCar(Year: Int!, Make: String!, Mileage: Int!, Description:String, Trans: String, imageUrl: [String]): Car
    deleteCar(carId: ID!): Car
  }
`;

module.exports = typeDefs;