import { gql } from '@apollo/client'

export const GET_CARS = gql`
    query GetCars {
        Cars {
            _id
            Year
            Make
            Mileage
            Description
            Trans
            imageUrl
        }
    }`

export const FIND_CAR = gql`
    query Cars($id: ID!){
        findCar(_id:$id){
            _id
            Year
            Make
            Mileage
            Description
            Trans
            imageUrl
        }
    }`

export const ADD_CAR = gql`
    mutation addCar($Year: Int!, $Make: String!, $Mileage: Int!, $Description: String, $Trans: String, $imageUrl: [String]) {
        addCar(Year: $Year, Make: $Make, Mileage: $Mileage, Description: $Description, Trans: $Trans, imageUrl: $imageUrl){
            _id
            Year
            Make
            Mileage
            Description
            Trans
            imageUrl
        }
    }`
// export const DELETE_CARS = gql`
//     `

export const SIGN_IN = gql`
mutation signIn($Username: String!, $passwordInput: String!){
    signIn(Username: $Username, passwordInput: $passwordInput){
        success
        message
        token
    }
}`
// my flow idea is first sign in as admin. 
// second once admin signed in from that token in my resolvers im going to query user 
// from admin if admin id is correct change use state for signed in hook
// from false to true. after it is true then the button to add cars will appear.
export const GET_USER = gql`
query getUser{
    User {
        Admin
    }
}
`

export const DELETE_CAR = gql`
mutation deleteCar($carId: ID!){
    deleteCar(carId: $carId) {
        _id
        Year
        Make
        Mileage
        Description
        Trans
        imageUrl
    }
}`