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
    trim: String
    sold: Boolean
    upcoming: Boolean
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



  type userMessage{
    _id: ID
    firstName: String
    lastName:String
    emailAddress:String
    phoneNumber: String
    message:String
    dateString: String
    timeString: String
    isRead: Boolean
  }

  type Query {
    User: [User]
    Cars: [Car]
    AllCars: [Car]
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
      trim: String
    ) : [Car]
      AuthCheck : Auth
      getMessage: [userMessage]
      UpcomingCars: [Car]
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
      trim: String
      sold: Boolean
      upcoming: Boolean
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
        trim: String
        sold: Boolean
        upcoming: Boolean
      ): Car
    deleteCar(carId: ID!, key:[String]!): Car
    signIn(usernameInput: String!, passwordInput:String!): AuthResponse
    createPresignedUrl(key:String!): PresignedResponse
    sendMessage(firstName: String!, lastName:String!, emailAddress:String!, phoneNumber: String!, message:String!, timeString: String dateString: String): Auth 
    deleteMessage(_id: String!): [userMessage]
    markMessageRead(_id: String!): userMessage
    deleteImage(url: String!): PresignedResponse
  }
`;

module.exports = typeDefs;



