const { Car } = require('../models')

const resolvers = {
    Query: {
      Cars: async () => {
        return Car.find()
      }
    },
    Mutations: {
      addCar: async (parent, {Year, Make, Milage, Description, Trans}) => {
        const car = await Car.create({Year, Make, Milage, Description, Trans});
        return { car }
      }
    }
  };

module.exports = resolvers;