import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { variables } from "./Variables.js";

const MangeBorrowedAdmin = () => {
    const [requests, setRequests] = useState([]);
    const userid = sessionStorage.getItem('userid'); //  your token is stored in localStorage

    useEffect(() => {

        /* Get books data from API */
        axios
            .get(variables.REQUEST_SERV_API + "GetAllBorrowingRequests")
            .then((res) => setRequests(res.data))
            .catch((error) => {

                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else if (error.response.status === 404) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else {
                        toast.error(` server is down!`, { position: toast.POSITION.TOP_CENTER });
                    }
                    return;
                }
                else {
                    toast.error(` service is down!`, { position: toast.POSITION.TOP_CENTER });
                }
            });

    }, []);

    const acceptRequest = (b) => {
        const modifiedData = {
            username: b.username,
            booktitle: b.booktitle
        };

        console.log(modifiedData)
        const formDataToSend = new FormData();

        // Append form fields and their values to the FormData object
        Object.entries(modifiedData).forEach(([name, value]) => {
            formDataToSend.append(name, value);
        });


        axios
            .post(variables.REQUEST_SERV_API + "AcceptBorrowRequest", formDataToSend)
            .then((res) => {
                toast.success("Accepted.", { position: toast.POSITION.TOP_CENTER });
                if (requests.length === 0) { window.location.reload() }

            })
            .catch((error) => {
                console.log(error); // Log the error object to inspect its structure
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else if (error.response.status === 404) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else {
                        toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
                    }
                }
                else {
                    toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
                }
            });
    }

    const deleterequest = (b) => {
        const modifiedData = {
            booktitle: b.booktitle,
            username: b.username
        };

        const formDataToSend = new FormData();

        // Append form fields and their values to the FormData object
        Object.entries(modifiedData).forEach(([name, value]) => {
            formDataToSend.append(name, value);
        });

        axios
            .post(variables.REQUEST_SERV_API + "RejectBorrowRequest", formDataToSend)
            .then((res) => {
                toast.success("Rejceted!", { position: toast.POSITION.TOP_CENTER });
                if (requests.lenght === 0) { window.location.reload() }

            })
            .catch((error) => {
                console.log(error); // Log the error object to inspect its structure
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else if (error.response.status === 404) {
                        toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER });

                    } else {
                        toast.error(` server or service is down!`, { position: toast.POSITION.TOP_CENTER });
                    }
                }
                else {
                    toast.error(`server or service is down!`, { position: toast.POSITION.TOP_CENTER });
                }
            });
    }




    return (
        <>
            <div className="bg-[#E5EDE8]">
                <div className="container mx-auto py-[120px]">

                    {requests.map((request) =>
                        <table className="min-w-full divide-y divide-gray-200 my-5">
                            <thead className="bg-white divide-gray-200">
                                <tr className="text-black bg-white rounded-lg">
                                    <th className="px-10 py-4 whitespace-nowrap"></th>
                                    <th className="px-6 py-4 whitespace-nowrap">username</th>
                                    <th className="px-6 py-4 whitespace-nowrap">booktitle</th>

                                </tr>
                            </thead>
                            <thead className="bg-white divide-gray-200">
                                <tr className="text-black bg-white rounded-lg">
                                    <td className="px-6 py-4 max-w-[200px] max-h-[100px]">
                                        <div className="flex justify-center items-center gap-2">
                                            <button className="bg-bgbtn text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                                                onClick={() => { acceptRequest(request) }}
                                            >
                                                Accept

                                            </button>
                                            <button className="bg-red-600 text-white text-[12px] w-full h-[40px] rounded-lg hover:bg-opacity-[50%] transition-all duration-200"
                                                onClick={() => deleterequest(request)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                                        <div className="max-w-full max-h-full overflow-hidden">
                                            {request.username}
                                        </div>
                                    </td><td className="px-6 py-4 max-w-[200px] max-h-[100px] text-center whitespace-normal">
                                        <div className="max-w-full max-h-full overflow-hidden">
                                            {request.booktitle}
                                        </div>
                                    </td>

                                </tr>
                            </thead>

                        </table>
                    )};
                </div>
            </div>
            <ToastContainer />

        </>
    );
};

export default MangeBorrowedAdmin