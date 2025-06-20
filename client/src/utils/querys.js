import { gql } from '@apollo/client'

export const GET_CARS = gql`
    query GetCars {
        Cars {
            _id
            year
            make
            model
            mileage 
            description
            trans
            imageUrl
            price
            vin
            drivetrain
            exteriorColor
            interiorColor
            fuelType
            engineType
            condition
            titleHistory
            ownership
            sold
        }
    }`

export const FIND_CAR = gql`
    query Cars($id: ID!){
        findCar(_id:$id){
            _id
            year
            make
            model
            mileage 
            description
            trans
            imageUrl
            price
            vin
            drivetrain
            exteriorColor
            interiorColor
            fuelType
            engineType
            condition
            titleHistory
            ownership
            sold
        }
    }`

export const ADD_CAR = gql`
    mutation addCar(
        $year: Int!
        $make: String!
        $model: String!
        $mileage: Int!
        $description: String
        $trans: String
        $imageUrl: [String] 
        $price: Int
        $vin: String
        $drivetrain: String
        $exteriorColor: String
        $interiorColor: String
        $fuelType: String
        $engineType: String
        $condition: String
        $titleHistory: String
        $ownership: String
        
        ) {
        addCar(
            year: $year
            make: $make
            model: $model
            mileage: $mileage
            description: $description 
            trans: $trans 
            imageUrl: $imageUrl
            price: $price
            vin: $vin
            drivetrain: $drivetrain
            exteriorColor: $exteriorColor
            interiorColor: $interiorColor
            fuelType: $fuelType
            engineType: $engineType
            condition: $condition
            titleHistory: $titleHistory
            ownership: $ownership
            ){
            year
            make
            mileage
            description
            trans
            imageUrl
            price
            vin
            drivetrain
            exteriorColor
            interiorColor
            fuelType
            engineType
            condition
            titleHistory
            ownership
        }
    }`

export const SIGN_IN = gql`
mutation signIn($usernameInput: String!, $passwordInput: String!){
    signIn(usernameInput: $usernameInput, passwordInput: $passwordInput){
        success
        message
    }

}`

export const GET_USER = gql`
query getUser{
    User {
        admin
    }
}
`

export const DELETE_CAR = gql`
mutation deleteCar(
    $carId: ID! 
    $key: [String]!
    ){
    deleteCar(
        carId: $carId 
        key: $key
        ) {
        _id
        year
        make
        model
        mileage 
        description
        trans
        imageUrl
        price
        vin
        drivetrain
        exteriorColor
        interiorColor
        fuelType
        engineType
        condition
        titleHistory
        ownership
    }
}`

export const PRESIGNED_URL = gql`
mutation createPresignedUrl($key: String!){
    createPresignedUrl(key: $key){
        success
        presignedUrl
        message
    }
}`

export const SEARCH_FIELD = gql`
query searchField
(
    $minYear: Int
    $maxYear: Int
    $minPrice: Int
    $maxPrice: Int
    $minMileage: Int
    $maxMileage: Int
    $make: String
    $model: String
    $description:String
    $trans: String
    $imageUrl: [String]
    $price:Int
    $vin: String
    $drivetrain: String
    $exteriorColor: String
    $interiorColor: String
    $fuelType: String
    $engineType: String
    $condition: String
    $titleHistory: String
    $ownership: String
){
    searchField
    (
        minYear: $minYear
        maxYear: $maxYear 
        minPrice: $minPrice 
        maxPrice: $maxPrice 
        minMileage: $minMileage
        maxMileage: $maxMileage
        make: $make
        model: $model
        description: $description
        trans: $trans
        imageUrl: $imageUrl
        price: $price
        vin: $vin
        drivetrain: $drivetrain
        exteriorColor: $exteriorColor
        interiorColor: $interiorColor
        fuelType: $fuelType
        engineType: $engineType
        condition: $condition
        titleHistory: $titleHistory
        ownership: $ownership
    )
    {
        _id
        year
        make
        model
        mileage 
        description
        trans
        imageUrl
        price
        vin
        drivetrain
        exteriorColor
        interiorColor
        fuelType
        engineType
        condition
        titleHistory
        ownership
    }

}`

export const AUTH_CHECK = gql`
query AuthCheck{
        AuthCheck{
            success
        }
}`

export const UPDATE_CAR = gql`
mutation updateCar(
    $_id: String
    $year: Int
    $make: String
    $model: String
    $mileage: Int
    $description: String 
    $trans: String 
    $imageUrl: [String]
    $price: Int 
    $vin: String
    $drivetrain: String
    $exteriorColor: String
    $interiorColor: String
    $fuelType: String
    $engineType: String
    $condition: String
    $titleHistory: String
    $ownership: String
    $sold: Boolean
) {
    updateCar(
        _id: $_id
        year: $year
        make: $make
        model: $model
        mileage: $mileage
        description: $description 
        trans: $trans 
        imageUrl: $imageUrl
        price: $price
        vin: $vin
        drivetrain: $drivetrain
        exteriorColor: $exteriorColor
        interiorColor: $interiorColor
        fuelType: $fuelType
        engineType: $engineType
        condition: $condition
        titleHistory: $titleHistory
        ownership: $ownership
        sold: $sold
    ) {
        _id
        year
        make
        model
        mileage
        description
        trans
        imageUrl
        price
        vin
        drivetrain
        exteriorColor
        interiorColor
        fuelType
        engineType
        condition
        titleHistory
        ownership
        sold
    }
}
`

export const SEND_MESSAGE = gql`
    mutation sendMessage(
        $firstName: String!
        $lastName: String!
        $emailAddress: String!
        $phoneNumber: String!
        $message: String!
    ){
        sendMessage(
            firstName: $firstName
            lastName: $lastName 
            emailAddress: $emailAddress
            phoneNumber: $phoneNumber
            message: $message
        ){
            success
        }
    }
`

export const GET_MESSAGE = gql`
    query getMessage {
            getMessage {
                firstName
                lastName
                emailAddress
                phoneNumber
                message
                timeString
                dateString
            }
    }`

export const DELETE_IMG = gql`
    mutation deleteImage($url: String!){
                deleteImage(url: $url){
                    success
                    presignedUrl
                    message
                }
    }
`
