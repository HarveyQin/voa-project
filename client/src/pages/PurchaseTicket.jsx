import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Header, Button } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';


function PurchaseTicket() {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [ticketType, setTicketType] = useState('');
    const { currentColor } = useStateContext();
    const { currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState('');
    const [message, setMessage] = useState("");

    const [inputs, setInputs] = useState({
        type: "",
        visit_date: "",
    });

    const handleChange = (e) => {

        // setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can make a request to your backend API to buy the ticket
        // get other info
        // INSERT INTO hzb_tickets (method, prch_date, vist_date, type, price, visitor_id)
        // VALUES ('Online', '2023-05-01', '2023-06-30', 'Child', 20, 1);
        const req = { method: 'Online', prch_date: new Date().toISOString().slice(0, 10), vist_date: inputs.visit_date, type: inputs.type, price: 35, visitor_id: currentUser.visitor_id };

        try {
            const res = await axios.post('/tickets', req);
            // console.log(res.data);
            setMessage(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">
            <Header category="" title="Purchase Ticket" />
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div >
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="type">Type</label>
                    <select
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        name="type"
                        value={inputs.type}
                        onChange={handleChange}
                    >
                        <option name="type" value="">please select a type</option>
                        <option name="type" value="Individual">individual</option>
                        <option name="type" value="Group">group</option>
                        <option name="type" value="Member">member</option>
                        <option name="type" value="School">student</option>
                    </select>
                    <label className="block font-medium text-gray-700 mb-2" htmlFor="visit_date">Visit Date</label>
                    <input
                        className="appearance-none rounded-md w-full py-2 px-3 text-gray-700 border border-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="date"
                        placeholder="visit date"
                        name="visit_date"
                        onChange={handleChange}
                    />
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}>Buy Ticket</button>
                </div>
            </form>
            {message && <div className="p-4 font-bold">{message}</div>}

        </div>

    );
}

export default PurchaseTicket;
