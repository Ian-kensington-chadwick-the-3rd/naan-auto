import { useQuery } from '@apollo/client'
// starting to attempt to fetch data from our Cars database to append to website. https://www.apollographql.com/docs/react/data/queries

const inv = () => {
    const {loading, error, data} = useQuery(GET_CARS)

    return (
        <div> {}</div>
    )
}

export default inv;