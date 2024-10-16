import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("https://www.api.shaheenarts.in/api/get-contact")
            if (res.status === 200) {
                const newData = res.data.data
                setData(newData.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [data.length])

    // Function to format the date to "dd mm - yyyy"
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options).replace(/\//g, ' - ');
    }

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created At</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.firstname} {item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.subject}</td>
                                        <td>{item.message}</td>
                                        <td>{formatDate(item.createdAt)}</td> {/* Format date */}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AllUsers;
