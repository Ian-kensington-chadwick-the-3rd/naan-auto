import { useState } from 'react'
import { useQuery } from '@apollo/client'
import AdminForm from '../components/adminForm'
import Messages from '../components/messages'
import AddCarData from '../components/addCar'
import { GET_MESSAGE } from '../utils/querys'

const adminDashboard = () => {
    const [action, setAction] = useState()
    const [activeTab, setActiveTab] = useState('inventory')
    const { data: msgData } = useQuery(GET_MESSAGE)
    const messageCount = msgData?.getMessage?.filter(m => !m.isRead).length ?? 0

    const actionHandler = (e) => {
        const { name } = e.target;
        setAction(name)
        setActiveTab(name);
    }

    const setPage = () => {
        if (action === 'inventory') {
            return < AdminForm />
        } else if (action === 'messages') {
            return <Messages />
        } else if (action === 'addcar') {
            return <AddCarData />
        } else {
            return <AdminForm />
        }
    }

    return (
        <div style={{ marginBottom: '50px' }}>
            <section>
                <div className='admin-dashboard__action-btn-container admin-dashboard__action-tab'>

                    <button name="inventory" onClick={e => actionHandler(e)}
                        className={activeTab === 'inventory' ? 'active' : ''}
                    >Inventory</button>


                    <button name="messages" onClick={e => actionHandler(e)}
                        className={activeTab === 'messages' ? 'active' : ''}
                    >
                        Messages
                        {messageCount > 0 && (
                            <span className='messages-badge'>{messageCount}</span>
                        )}
                    </button>


                    <button name="addcar" onClick={e => actionHandler(e)}
                        className={activeTab === 'addcar' ? 'active' : ''}
                    >Add Car</button>

                </div>
            </section>
            {setPage()}

        </div>
    )

}


export default adminDashboard;

