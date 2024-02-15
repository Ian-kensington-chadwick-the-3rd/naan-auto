const { Car } = require('../models/carschema')

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
      },
      deleteCar: async (parent, { carId }, context) => {
        if (context.car) {
          const car = await Car.findOneAndDelete({
            _id: carId,
          });
          await Car.findOneAndUpdate(
            { _id: context.car._id},
            {$pull: {car: car._id}});
            return car;
        }
      }
    }
  };

module.exports = resolvers;