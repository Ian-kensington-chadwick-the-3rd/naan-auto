const { Car } = require('../models/carschema.js')
// so the process that was explained to me through chat gpt is that in my database im going to create a car and cloudinary is going store the picture in my newly created imageUrl in the form of a string i am extremely skeptical of the code being used below LOL. For example what if the user wants to add a picture to the car after the car is created, I have never used cloudinary api so i am dependent on chat gpt code unil i do research myself through the docs my next plan is to start by messing with cloudinary through postman.

// update chat gpt is wrong the payload for a base64 is too big for graphql to handle from the client side to the back end instead im opting in for an unsigned upload directly from the client side. looked it up on the internet and its actually really simple compared to how i had it set up but it was good to test how cloudinary works within the graphql sandbox i was able to query cars and use mutations easily.

const resolvers = {
    Query: {
      Cars: async () => {
        return Car.find()
      },
      findCar: async (_, ID) => {
        return Car.find({_id: ID})
      },
      // findPic: async () => {
      // }
    },
    Mutation: {
      addCar: async (parent, {Year, Make, Mileage, Description, Trans, imageUrl}) => {
       
      
      //   try {
      //      var baseUrls = [];
      //    if(Array.isArray(imageUrl)){ //temp 
      //     for (const img of imageUrl) {
      //       console.log("Uploading image:", img);

      //       const uploadResponse = await cloudinary.uploader.upload(img, {
      //           folder: 'cars',
      //       });
      //       console.log("Image uploaded:", uploadResponse.secure_url);
      //       baseUrls.push(uploadResponse.secure_url);  
      //   }
      // } else {
      //   const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      //     folder: 'cars',
      // });
      // baseUrls.push(uploadResponse.secure_url)
      // console.log(imageUrl)
      // }
        
        const car = await Car.create({
          Year, 
          Make, 
          Mileage, 
          Description, 
          Trans,
          imageUrl:imageUrl
        
        });
        console.log('year: ',Year,"Make:", Make, " Mileage:" ,Mileage,"desription", Description, "trans:", Trans, "this is image url",imageUrl);
        return { car }

        
       
      // } catch (error) {
      //   console.error('Error uploading image or creating car:', error);
      //   console.log('this is base urls',baseUrls)
      //   throw new Error('Failed to add car');
      // }
      
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