const { Car, Password, User, Message } = require('../models/carschema.js')
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


const resolvers = {
  Query: {
    Cars: async () => {
      return Car.find()
    },
    findCar: async (_, ID) => {
      return Car.find({ _id: ID })
    },
    searchField: async (_,
      {
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        minMileage,
        maxMileage,
        make,
        model,
        description,
        trans,
        vin,
        drivetrain,
        exteriorColor,
        interiorColor,
        fuelType,
        engineType,
        condition,
        titleHistory,
        ownership,
      }) => {

      const query = {};

      if (minYear && maxYear) {
        query.year = { $gte: minYear, $lte: maxYear }
      }
      if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice }
      }
      if (minMileage && maxMileage) {
        query.mileage = { $gte: minMileage, $lte: maxMileage }
      }

      make && make !== 'all' ? query.make = make : delete query.make;
      model && model !== 'all' ? query.model = model : delete query.model;
      description && description !== 'all' ? query.description = description : delete query.description;
      trans && trans !== 'all' ? query.trans = trans : delete query.trans;
      if (vin) query.vin = vin;
      drivetrain && drivetrain !== 'all' ? query.drivetrain = drivetrain : delete query.drivetrain;
      exteriorColor && exteriorColor ? query.exteriorColor = exteriorColor : delete query.exteriorColor;
      interiorColor && interiorColor !== 'all' ? query.interiorColor = interiorColor : delete query.interiorColor;
      fuelType && fuelType !== 'all' ? query.fuelType = fuelType : delete query.fuelType;
      engineType && engineType !== 'all' ? query.engineType = engineType : delete query.engineType;
      titleHistory && titleHistory !== 'all' ? query.titleHistory = titleHistory : delete query.titleHistory;
      ownership && ownership !== 'all' ? query.ownership = ownership : delete query.ownership;

      console.log("this is query", query)

      const searchResult = await Car.find(query)

      console.log(searchResult)

      return searchResult;


    },
    Login: async () => {
      return Password.find()
    },
    AuthCheck: async (parent, { Key }) => {
      try {
        if (!Key) {
          throw new Error('token is not provided')
        }
        const jwtSecretKey = process.env.JWT_SECRET_KEY

        jwt.verify(Key, jwtSecretKey)

        return { success: true }

      } catch (e) {
        console.error("invalid token at authcheck", e.message)
        return { success: false }

      }
    },
    User: async (parent, data, context) => {
      if (!context || !context.user) {
        console.error("not logged in")
        throw new Error("not logged in")
      }
      return User.find()
    },
    getMessage: async (parent, data, context) => {
      if (!context || !context.user) {
        console.error("Authentication failed: Context or user not found.");
        throw new Error("Authentication required.");
      }

      if (!context.user.id) {
        console.error("Authentication failed: User ID not found.");
        throw new Error("Authentication denied.");
      }

      return Message.find()
    }
  },
  Mutation: {
    addCar: async (parent,
      {
        year,
        make,
        model,
        mileage,
        description,
        trans,
        imageUrl,
        price,
        vin,
        drivetrain,
        exteriorColor,
        interiorColor,
        fuelType,
        engineType,
        condition,
        titleHistory,
        ownership,
      }, context) => {

      if (!context || !context.user) {
        console.error("Authentication failed: Context or user not found.");
        throw new Error("Authentication required.");
      }

      // Check if user ID exists
      if (!context.user.id) {
        console.error("Authentication failed: User ID not found.");
        throw new Error("Authentication denied.");
      }
      const r2AccountId = process.env.R2_ACCOUNT_ID
      const r2BucketName = process.env.R2_BUCKET_NAME
      const baseUrl = ''
      
      // checking if image is an array or single if not upload only one picture
      const processedImgUrls = Array.isArray(imageUrl) ?
        imageUrl.map(key => `${baseUrl}/${key}`) : [`${baseUrl}/${imageUrl}`]


      const car = await Car.create({
        year,
        make,
        model,
        mileage,
        description,
        trans,
        // will change below rates are limited change to custom domain once bought http//:${r2AccountId}.r2.cloudflarestorage.com/${r2BucketName}/${imageUrl} => http//:cnd.customdomain.com something like that
        imageUrl: processedImgUrls,
        price,
        vin,
        drivetrain,
        exteriorColor,
        interiorColor,
        fuelType,
        engineType,
        condition,
        titleHistory,
        ownership,
      });
      console.log('year: ', year, "Make:", make, " Mileage:", mileage, "desription", description, "trans:", trans, "this is image url", imageUrl);
      console.log(context)
      console.log(car)
      return car;
    },
    updateCar: async (parent, {
      _id,
      year,
      make,
      model,
      mileage,
      description,
      trans,
      imageUrl,
      price,
      vin,
      drivetrain,
      exteriorColor,
      interiorColor,
      fuelType,
      engineType,
      condition,
      titleHistory,
      ownership
    }, context) => {

      if (!context || !context.user) {
        throw new Error('not logged in at update car')
      }

      const query = {};

      if (year) query.year = year;
      if (make) query.make = make;
      if (model) query.model = model;
      if (mileage) query.mileage = mileage;
      if (description) query.description = description;
      if (trans) query.trans = trans;
      if (imageUrl) query.imageUrl = imageUrl;
      if (price) query.price = price;
      if (vin) query.vin = vin;
      if (drivetrain) query.drivetrain = drivetrain;
      if (exteriorColor) query.exteriorColor = exteriorColor;
      if (interiorColor) query.interiorColor = interiorColor;
      if (fuelType) query.fuelType = fuelType;
      if (engineType) query.engineType = engineType;
      if (condition) query.condition = condition;
      if (titleHistory) query.titleHistory = titleHistory;
      if (ownership) query.ownership = ownership;
      console.log(_id)
      try {
        console.log(query)

        const result = await Car.findByIdAndUpdate(
          { _id },
          { $set: query },
          { new: true, runValidators: true })

        return result;
      } catch (err) {
        throw new Error("error at update car" + err)
      }
    },
    deleteCar: async (parent, { carId, key }, context) => {
      console.log("this is context", context)
      if (!context.user) {
        throw new Error("user not authenicated")
      }
      const accountId = process.env.R2_ACCOUNT_ID
      const accessKey = process.env.R2_ACCESS_KEY_ID
      const secretKey = process.env.R2_SECRET_ACCESS_KEY
      const bucketName = process.env.R2_BUCKET_NAME

      const client = new S3Client({
        region: 'us-east-1',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey
        },
      });

      // https://pub-50ee404c2cfc48dd970fc6470185d232.r2.dev/cars/064cb9da-fa7d-4b1b-99d0-4fb15e703bf5.jpg

      const command = new DeleteObjectsCommand({
        Bucket: bucketName,
        Delete: {
          Objects: key.map(k => {
            // Extract just the filename from the URL by creating a new url constructer then by accessing the instance property 'pathname' 
            // which returns /cars/064cb9da-fa7d-4b1b-99d0-4fb15e703bf5.jpg then is splits by '/' => ['', 'cars', '064cb9da-fa7d-4b1b-99d0-4fb15e703bf5.jpg']
            // last but not least i access the filename by using the last index of the array
            const pathParts = new URL(k).pathname.split('/');
            const filename = pathParts[pathParts.length - 1];

            // Create the correct key with your bucket structure
            return { Key: `cars/${filename}` };
          })

        }
      })

      try {
        console.log(command)
        const response = await client.send(command);
        console.log(response)
      } catch (err) {
        console.error(err, 'err at deleting picture from r2 database')
      }

      try {
        const car = await Car.findOneAndDelete({
          _id: carId,
        });
        await Car.findOneAndUpdate(
          { _id: carId },
          { $pull: { car: carId } });
        return car;
      } catch (err) {
        console.error(err, 'error at deleting car from mongo db')
      }
    },
    signIn: async (parent, { username, passwordInput }, context) => {

      try {
        var randomId = uuidv4();
        const Admin = await User.findOne({ username }).exec();

        if (!Admin) {
          return {
            user: null,
            token: null,
            success: false,
            message: "Username not found Try again!🙄"
          }
        }


        const hashedPassword = await Password.findOne().exec();

        const match = await bcrypt.compare(passwordInput, hashedPassword.password)

        if (!match) {
          return {
            user: null,
            token: null,
            success: false,
            message: "Password incorrect authentication denied!😡"
          }
        }



        var token = jwt.sign({ id: randomId, username: Admin.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        console.log(Admin.username)

        return {
          user: {
            Username: Admin.username,
            Admin: Admin._id
          },
          message: "welcome admin!!!! ☺️",
          token,
          success: true
        }
      } catch (error) {
        return {
          user: null,
          success: false,
          token: null,
          message: `error during signIn :${error.message}`
        }
      }
    },
    createPresignedUrl: async (parent, { key }, context) => {
      const accountId = process.env.R2_ACCOUNT_ID
      const accessKey = process.env.R2_ACCESS_KEY_ID
      const secretKey = process.env.R2_SECRET_ACCESS_KEY
      const bucketName = process.env.R2_BUCKET_NAME


      const client = new S3Client({
        region: 'us-east-1',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey
        },
      });
      const command = new PutObjectCommand({ Bucket: bucketName, Key: key })
      try {
        const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
        return {
          success: true,
          presignedUrl: signedUrl,
          message: 'key has successfully been generated!'
        }
      } catch (err) {
        return {
          success: false,
          presignedUrl: null,
          message: err
        }
      }
    },
    sendMessage: async (parent, { firstName, lastName, emailAddress, phoneNumber, message, timeString, dateString }) => {

      await Message.create({ firstName, lastName, emailAddress, phoneNumber, message, timeString, dateString })

      return {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        message,
        timeString,
        dateString
      }

    },
    deleteMessage: async (parent, {id}) =>{
      try{
      const result = await Message.findByIdAndDelete({_id: id})
      return result
      } catch{
       throw new Error('failed to delete error')
      }
    }

  },
};

module.exports = resolvers;



