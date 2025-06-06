import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_MESSAGE } from '../utils/querys'
import Ripple from './loading'

// going to have the ability to mark as read and delete
const Messages = () => {
    const { loading, data, error } = useQuery(GET_MESSAGE)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (data && data.getMessage) {
            setMessages(data.getMessage)
        }
    }, [data])


    if (loading) return<Ripple className='inventory-rippleloading'/>;
    if (error) return <p>Error loading messages.</p>;


    return (
        <div className='message__container'>
            {messages?.map((message, i) => {
                return(
                <div key={i} className='message__background'>
                    <div className='search_filter__group'>
                        <span>
                            {message.dateString}
                        </span>
                        <span>
                            {message.timeString}
                        </span>
                    </div>
                    <hr/>
                    <div className='search_filter__group'>
                        <span>
                            {message.firstName}
                        </span>
                        <span>
                            {message.lastName}
                        </span>
                        
                    </div>
                    <hr></hr>
                    <div className='search_filter__group'>
                        <span>
                            {message.emailAddress}
                        </span>
                        <span>
                            {message.phoneNumber}
                        </span>
                    
                    </div>
                    <hr></hr>
                    <div className='search_filter__group'>
                        {message.message}
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default Messages;