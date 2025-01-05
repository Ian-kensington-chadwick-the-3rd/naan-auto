const typeDefs = `
  type Car {
    _id: ID
    Year: Int!
    Make: String!
    Mileage: Int!
    Description: String
    Trans: String
    imageUrl: [String]
  }

  type Login {
    Password: String
  }

  type User {
    _id: ID
    Username: String
    Admin: String
  }

  type AuthResponse {
    success: Boolean
    message: String
    token: String
    user: User
  }


  type Query {
    User: [User]
    Cars: [Car]
    findCar(_id: ID!): [Car]
    Login: [Login]
  }

  type Mutation {
    addCar(Year: Int!, Make: String!, Mileage: Int!, Description:String, Trans: String, imageUrl: [String]): Car
    deleteCar(carId: ID!): Car
    signIn(Username: String!, passwordInput:String!): AuthResponse
  }
`;

module.exports = typeDefs;



