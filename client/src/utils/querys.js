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