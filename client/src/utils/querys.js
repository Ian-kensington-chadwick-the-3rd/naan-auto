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
        }
    }`

export const ADD_CARS = gql`
    mutation addCars($Year: Int!, $Make: String!, $Mileage: Int!, $Description: String, $Trans: String) {
        addCars(Year: $Year, Make: $Make, Mileage: $Mileage, Description: $Description, Trans: $Trans){
            id
            Year
            Make
            Mileage
            Description
            Trans
        }
    }`
// export const DELETE_CARS = gql`
//     `