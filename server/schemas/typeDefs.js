const typeDefs = `
  type Car {
    _id: ID
    year: Int
    make: String
    model: String
    mileage: Int
    description: String
    trans: String
    imageUrl: [String]
    price: Int
    vin: String
    drivetrain: String
    exteriorColor: String
    interiorColor: String
    fuelType: String
    engineType: String
    condition: String
    titleHistory: String
    ownership: String
  }

  type Login {
    password: String
  }

  type User {
    _id: ID
    username: String
    admin: String
  }

  type AuthResponse {
    success: Boolean
    message: String
    token: String
    user: User
  }

  type PresignedResponse {
    success: Boolean
    presignedUrl: String
    message: String
  }

  type Auth {
    success: Boolean
  }

  type Query {
    User: [User]
    Cars: [Car]
    findCar(_id: ID!): [Car]
    Login: [Login]
    searchField
    (
      minYear: Int,
      maxYear: Int, 
      minPrice: Int,
      maxPrice: Int, 
      minMileage: Int, 
      maxMileage: Int,
      year: Int
      make: String
      model: String
      description:String 
      trans: String
      imageUrl: [String]
      price:Int
      vin: String
      drivetrain: String
      exteriorColor: String
      interiorColor: String
      fuelType: String
      engineType: String
      condition: String
      titleHistory: String
      ownership: String
    ) : [Car]
      AuthCheck(Key: String) : Auth
  }

  type Mutation {
    addCar(
      year: Int!
      make: String!
      model: String! 
      mileage: Int! 
      description:String 
      trans: String 
      imageUrl: [String]
      price:Int 
      vin: String
      drivetrain: String
      exteriorColor: String
      interiorColor: String
      fuelType: String
      engineType: String
      condition: String
      titleHistory: String
      ownership: String
      ): Car
      updateCar(
        _id: String
        year: Int
        make: String
        model: String
        mileage: Int
        description:String 
        trans: String 
        imageUrl: [String]
        price:Int 
        vin: String
        drivetrain: String
        exteriorColor: String
        interiorColor: String
        fuelType: String
        engineType: String
        condition: String
        titleHistory: String
        ownership: String
      ): Car
    deleteCar(carId: ID!, key:String!): Car
    signIn(username: String!, passwordInput:String!): AuthResponse
    createPresignedUrl(key:String!): PresignedResponse
  }
`;

module.exports = typeDefs;



