const { Car } = require('../models/carschema.js')

const resolvers = {
    Query: {
      Cars: async () => {
        return Car.find()
      }
    },
    Mutation: {
      addCar: async (parent, {Year, Make, Mileage, Description, Trans}) => {
        const car = await Car.create({Year, Make, Mileage, Description, Trans});
        console.log('year: ',Year,"Make:", Make, " Mileage:" ,Mileage,"desription", Description, "trans:", Trans);
        return { car }
      },
      deleteCar: async (parent, { carId }, context) => {
        if (context.car) {
          const car = await Car.findOneAndDelete({
            _id: carId,
          });
          await Car.findOneAndUpdate(
            { _id: context.carId},
            {$pull: {car: carId}});
            return car;
        }
      }
    }
  };

module.exports = resolvers;