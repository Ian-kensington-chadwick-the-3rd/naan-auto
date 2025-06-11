require('dotenv').config()
const { Car, User, Message } = require('../models/carschema.js')
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const nodeMailer = require('nodemailer');


let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

class bucketAlgo {
  constructor() {
    this.ipData = new Map()
    this.intervalDelay = 10 * 60 * 1000;
  }
  initIp(ip) {
    if (this.ipData.has(ip)) return;
    this.ipData.set(ip, {
      tokens: 3,
      lastActivity: Date.now()
    });
  }

  plusToken(ip) {
    const id = setInterval(() => {
      const currentInfo = this.ipData.get(ip)

      if (!currentInfo) {
        clearInterval(id)
        return;
      }
      if (currentInfo.tokens >= 3) {
        clearInterval(id);
        return;
      }

      if (this.ipData.has(ip)) {
        this.ipData.set(ip, {
          ...currentInfo,
          tokens: currentInfo.tokens + 1,
          lastActivity: Date.now()
        })
      } else {
        clearInterval(id)
      }
    }, this.intervalDelay);
  }

  inactiveIp(ip) {
    const maxUnActivity = 10 * 60 * 1000
    const ipInfo = this.ipData.get(ip)
    if (!this.ipData.has(ip)) {
      this.initIp(ip);
      return false;
    }
    const timeSinceLastActivity = Date.now() - ipInfo.lastActivity;
    return timeSinceLastActivity > maxUnActivity

  }

  consumeToken(ip) {
    if (!this.ipData.has(ip)) {
      this.initIp(ip);
      return;
    }
    const ipInfo = this.ipData.get(ip)

    if (ipInfo.tokens > 0) {
      this.ipData.set(ip, {
        ...ipInfo,
        tokens: ipInfo.tokens - 1,
        lastActivity: Date.now()
      })
      return true;
    }
    return false;
  }

  cleanUpIps() {
    for (const ips of this.ipData.keys()) {
      if (this.inactiveIp) {
        this.ipData.delete(ips);
      }
    }
  }
}

const newBucketAlgo = new bucketAlgo();




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
      console.log(minYear,
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
        ownership,)

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



      const searchResult = await Car.find(query)


      return searchResult;


    },
    // Login: async () => {
    //   return Password.find()
    // },
    AuthCheck: async (parent, ___, context) => {

      try {

        if (!context.user) {
          throw new Error('token is not provided')
        }

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
      console.log(context.user)
      if (!context || !context.user) {
        console.error("Authentication failed: Context or user not found.");
        throw new Error("Authentication required.");
      }

      // Check if user ID exists
      if (!context.user.id) {
        console.error("Authentication failed: User ID not found.");
        throw new Error("Authentication denied.");
      }
      const baseUrl = 'https://images.naanauto.com';

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
      ownership,
      sold
    }, context) => {
      console.log(context.user)

      if (!context.user) {
        throw new Error('not logged in at update car')
      }

      const query = {};

      if (year !== undefined && year !== null) query.year = year;
      if (make !== undefined && make !== null) query.make = make;
      if (model !== undefined && model !== null) query.model = model;
      if (mileage !== undefined && mileage !== null) query.mileage = mileage;
      if (description !== undefined && description !== null) query.description = description;
      if (trans !== undefined && trans !== null) query.trans = trans;
      if (imageUrl !== undefined && imageUrl !== null) query.imageUrl = imageUrl;
      if (price) query.price = price;
      if (vin !== undefined && vin !== null) query.vin = vin;
      if (drivetrain !== undefined && description !== null) query.drivetrain = drivetrain;
      if (exteriorColor !== undefined && exteriorColor !== null) query.exteriorColor = exteriorColor;
      if (interiorColor !== undefined && interiorColor !== null) query.interiorColor = interiorColor;
      if (fuelType !== undefined && fuelType !== null) query.fuelType = fuelType;
      if (engineType !== undefined && engineType !== null) query.engineType = engineType;
      if (condition !== undefined && condition !== null) query.condition = condition;
      if (titleHistory !== undefined && titleHistory !== null) query.titleHistory = titleHistory;
      if (ownership !== undefined && ownership !== null) query.ownership = ownership;
      if (sold !== undefined && sold !== null) query.sold = sold

      try {
        console.log(sold)
        console.log('this is query ===>>>>',query)
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

      const validKeys = key.filter(k => {
        try {
          new URL(k);
          return true;
        } catch {
          return false;
        }
      }).map(k => {
        // Extract just the filename from the URL by creating a new url constructer then by accessing the instance property 'pathname' 
        // which returns /cars/064cb9da-fa7d-4b1b-99d0-4fb15e703bf5.jpg then is splits by '/' => ['', 'cars', '064cb9da-fa7d-4b1b-99d0-4fb15e703bf5.jpg']
        // last but not least i access the filename by using the last index of the array
        const pathParts = new URL(k).pathname.split('/');
        const filename = pathParts[pathParts.length - 1];
        // Create the correct key with your bucket structure
        return { Key: `cars/${filename}` };
      })

      if (validKeys.length > 0) {
        const command = new DeleteObjectsCommand({
          Bucket: bucketName,
          Delete: {
            Objects: validKeys
          }
        })
        try {

          await client.send(command);

        } catch (err) {
          console.error(err, 'err at deleting picture from r2 database')
        }
      } else {
        console.error('no valid urls')
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
    signIn: async (parent, { usernameInput, passwordInput }, { res, user }) => {

      try {
        var randomId = uuidv4();
        const Admin = await User.findOne({ username: usernameInput }).exec();

        if (!Admin.username) {
          return {
            user: null,
            token: null,
            success: false,
            message: "Username not found Try again!🙄"
          }
        }


        const hashedPassword = Admin.password
        const match = await bcrypt.compare(passwordInput, hashedPassword)

        if (!match) {
          return {
            user: null,
            token: null,
            success: false,
            message: "Password incorrect authentication denied!😡"
          }
        }



        var token = jwt.sign({ id: randomId, username: Admin.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })


        res.cookie('token', token, {
          signed: false,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 3600000
        })

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

      console.log("env ===============>>>>>>>>>>>>>>>>>>>>>>", accountId, accessKey, secretKey, bucketName)
      if (!accountId || !accessKey || !secretKey || !bucketName) {
        console.error('Missing R2 environment variables');
        return {
          success: false,
          presignedUrl: null,
          message: 'Server configuration error: Missing R2 credentials'
        };
      }

      const client = new S3Client({
        region: 'auto',
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
    sendMessage: async (parent, { firstName, lastName, emailAddress, phoneNumber, message }, context) => {

      const ip = context.ip;

      if (!newBucketAlgo.ipData.has(ip)) {
        newBucketAlgo.initIp(ip);
      }

      if (!firstName && !lastName && !emailAddress && !phoneNumber && !message) {
        return 'all fields must be filled out'
      }

      const tokenconsume = newBucketAlgo.consumeToken(ip)
      const timeLimit = newBucketAlgo.intervalDelay
      if (!tokenconsume) {
        newBucketAlgo.plusToken(ip);
        return { success: false };
      }


      const now = new Date();

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      const hours = now.getHours();
      const minutes = now.getMinutes();

      const dateString = `${month}/${day}/${year}`;
      const timeString = `${hours}:${minutes}`

      const apolloMessage = await Message.create({ firstName, lastName, emailAddress, phoneNumber, message, timeString, dateString })

      const emailMessage = {
        from: `${emailAddress}`,
        to: "iansills04@gmail.com",
        subject: `you have one message from ${firstName} ${lastName}`,
        html: `
          <h2>You have a new message</h2>
          <p>From: ${firstName} ${lastName}</p>
          <p>Email: ${emailAddress}</p>
          <p>phone: ${phoneNumber}</p>
          <h3>message:</h3>
          <p style="font-style: itallic; color:#555;">${message}</p>
          <p>Time: ${timeString} on ${dateString}</p>
          <p style='font-size:5px;'>this is an automated message from naan-auto.com</p>
          `
      };

      if (apolloMessage) {
        transporter.sendMail(emailMessage, (err, info) => {
          if (err) {
            console.log(err)
          } else {
            console.log(info.response)
          }
        })
      }

      return {
        success: true
      };

    },
    deleteMessage: async (parent, { id }) => {
      try {
        const result = await Message.findByIdAndDelete({ _id: id })
        return result
      } catch {
        throw new Error('failed to delete error')
      }
    },
    deleteImage: async (parent, { url }) => {
      console.log(url)
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

      try {

        const pathParts = new URL(url).pathname.split('/')
        const fileName = pathParts[pathParts.length - 1]

        const command = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: `cars/${fileName}` 
        })

        const res = await client.send(command);
        console.log(res)
        return {
          success: true,
          presignedUrl: fileName,
          message: 'car picture deletion success!'
        }

      } catch (err) {
        return {
          success: false,
          presignedUrl: null,
          message: err
        }
      }
    }
  },
};

module.exports = resolvers;



