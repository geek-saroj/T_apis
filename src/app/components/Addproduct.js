"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function addproduct() {
    const [book, setbook] = useState("");
    const [auther, setauther] = useState("");
    const [date, setdate] = useState("");
    const [des, setdes] = useState("");
    const [bookData, setBookData] = useState([]);
    const [showTable, setShowTable] = useState(false);






    const handleClick = (e) => {
        // e.preventDefault();
        const res = fetch('http://localhost:3004/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: book,
                author: auther,
                publishDate: date,
                description: des
            })

        })
        if (res) {
            toast.success("book added successfully")
            // form.reset();
        }
     

    }

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const res = await fetch('http://localhost:3004/api/booksquery');
                const data = await res.json();
                setBookData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleGetData();
    }, [])

    const handleButtonClick = () => {
        setShowTable(prevState => !prevState);
      };
    return (
        <div className="max-w-[1127px] 2xl:max-w-[1180px] mx-auto my-10 px-[30px] lg:px-[20px] md:px-0 ">
            <ToastContainer />
            <form onSubmit={handleClick} className=''>
                <h1 className='text-4xl text-center font-bold'>
                    Add book to Database
                </h1>

                <div className='flex flex-col gap-8 mx-auto'>
                <input type='text' placeholder='Enter book name' onChange={(e) => setbook(e.target.value)} required  ></input>
                <input type='text' placeholder='Enter Auther name' onChange={(e) => setauther(e.target.value)} required ></input>
                <input type='date' placeholder='Enter date of publication' onChange={(e) => setdate(e.target.value)} required ></input>
                <input type='text' placeholder='Enter book specification' onChange={(e) => setdes(e.target.value)} required></input>
                <button className="bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded my-4">Add</button>
                </div>
             
            </form>
            <div className="container mx-auto">
                <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Show Table</button>
                {showTable && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(data.publishDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>




        </div>
    )
}

export default addproduct