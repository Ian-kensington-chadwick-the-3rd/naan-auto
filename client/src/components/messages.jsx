import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_MESSAGE, MARK_MESSAGE_READ, DELETE_MESSAGE } from '../utils/querys'
import Ripple from './loading'

const todayString = (() => {
    const d = new Date()
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
})()

const Messages = () => {
    const { loading, data, error } = useQuery(GET_MESSAGE)
    const [markMessageRead] = useMutation(MARK_MESSAGE_READ)
    const [deleteMessage] = useMutation(DELETE_MESSAGE)
    const [messages, setMessages] = useState([])
    const [expandedId, setExpandedId] = useState(null)
    const [filter, setFilter] = useState('today')
    const [unreadOnly, setUnreadOnly] = useState(false)

    useEffect(() => {
        if (data && data.getMessage) {
            setMessages(data.getMessage)
        }
    }, [data])

    const toggle = (message) => {
        setExpandedId(prev => prev === message._id ? null : message._id)
    }

    const handleMarkRead = (e, message) => {
        e.stopPropagation()
        setMessages(prev => prev.map(m => m._id === message._id ? { ...m, isRead: true } : m))
        markMessageRead({ variables: { _id: message._id } })
    }

    const handleDelete = (e, message) => {
        e.stopPropagation()
        setMessages(prev => prev.filter(m => m._id !== message._id))
        setExpandedId(null)
        deleteMessage({ variables: { _id: message._id } })
    }

    const filtered = messages.filter(m => {
        if (filter === 'today' && m.dateString !== todayString) return false
        if (unreadOnly && m.isRead && m._id !== expandedId) return false
        return true
    })

    const unreadCount = messages.filter(m => !m.isRead).length

    if (loading) return <Ripple className='inventory-rippleloading' />;
    if (error) return <p>Error loading messages.</p>;

    return (
        <div className='message__container'>
            <div className='message__filters'>
                <div className='message__filter-tabs'>
                    <button
                        className={`message__filter-tab${filter === 'today' ? ' active' : ''}`}
                        onClick={() => setFilter('today')}
                    >Today</button>
                    <button
                        className={`message__filter-tab${filter === 'all' ? ' active' : ''}`}
                        onClick={() => setFilter('all')}
                    >All</button>
                </div>
                <button
                    className={`message__unread-toggle${unreadOnly ? ' active' : ''}`}
                    onClick={() => {
                        if (!unreadOnly) setFilter('all')
                        setUnreadOnly(p => !p)
                    }}
                >
                    Unread
                    {unreadCount > 0 && <span className='message__unread-count'>{unreadCount}</span>}
                </button>
            </div>

            {filtered.length === 0 && (
                <p className='message__empty'>
                    {filter === 'today' ? 'No messages today.' : 'No messages.'}
                </p>
            )}

            {filtered.map((message, i) => (
                <div
                    key={i}
                    className={`message-card${expandedId === message._id ? ' message-card--open' : ''}${!message.isRead ? ' message-card--unread' : ''}`}
                    onClick={() => toggle(message)}
                >
                    <div className='message-card__row'>
                        <div className='message-card__left'>
                            <div className='message-card__name-row'>
                                {!message.isRead && <span className='message-card__unread-dot' />}
                                <span className='message-card__name'>
                                    {message.firstName} {message.lastName}
                                </span>
                            </div>
                            <span className='message-card__preview'>
                                {message.message}
                            </span>
                        </div>
                        <div className='message-card__right'>
                            <span className='message-card__datetime'>{message.dateString}</span>
                            <span className='message-card__chevron'>
                                {expandedId === message._id ? '▲' : '▼'}
                            </span>
                        </div>
                    </div>

                    {expandedId === message._id && (
                        <div className='message-card__detail' onClick={e => e.stopPropagation()}>
                            <div className='message-card__contact-row'>
                                {message.emailAddress && (
                                    <a href={`mailto:${message.emailAddress}`} className='message-card__contact-link'>
                                        {message.emailAddress}
                                    </a>
                                )}
                                {message.phoneNumber && (
                                    <a href={`tel:${message.phoneNumber}`} className='message-card__contact-link'>
                                        {message.phoneNumber}
                                    </a>
                                )}
                            </div>
                            <p className='message-card__body'>{message.message}</p>
                            <div className='message-card__detail-footer'>
                                <span className='message-card__time'>{message.timeString}</span>
                                <div className='message-card__footer-actions'>
                                    {!message.isRead && (
                                        <button
                                            className='message-card__mark-read'
                                            onClick={e => handleMarkRead(e, message)}
                                        >Mark as Read</button>
                                    )}
                                    <button
                                        className='message-card__delete'
                                        onClick={e => handleDelete(e, message)}
                                    >Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Messages;
