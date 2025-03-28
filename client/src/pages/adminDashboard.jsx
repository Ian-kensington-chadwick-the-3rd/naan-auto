import { useState, useEffect } from 'react'
import AdminForm from '../components/adminForm'
import Messages from '../components/messages'
import AddCarData from '../components/addCar'
// will have a use hook that tracks what to load in either car inv or messages exc...

const adminDashboard = () => {
    const [action, setAction] = useState()
    const [activeTab, setActiveTab] = useState('inventory')

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
                    >messages</button>


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

