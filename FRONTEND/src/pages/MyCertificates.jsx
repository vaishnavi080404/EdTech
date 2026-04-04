import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAllCertificates } from '../services/operations/profileAPI'
import { Link } from 'react-router-dom';

const MyCertificates = () => {
    const { token } = useSelector((state) => state.auth);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);
            const result = await getUserAllCertificates(token);
            if (result) {
                setCertificates(result);
            }
            setLoading(false);
        };
        if (token) {
            fetchCertificates();
        }
    }, [token]);

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="text-white">
            <h1 className="mb-14 mt-14 text-3xl font-medium text-richblack-5 ">My Certificates</h1>
            
            {!certificates || certificates.length === 0 ? (
                <p className="text-richblack-200">No certificates earned yet. Complete a course to receive one!</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{certificates.map((cert) => {
    console.log(cert);   
    return (
        <div key={cert._id} className="relative flex flex-col rounded-lg bg-espresso-brown border-2 p-6 shadow-md">
            {cert.course?.thumbnail && (
                <img 
                    src={cert.course.thumbnail} 
                    alt={cert.course.courseName} 
                    className="h-40 w-full rounded-md object-cover mb-4" 
                />
            )}
            <h2 className="text-xl font-semibold text-richblack-5 mb-2">{cert.course?.courseName || 'Unknown Course'}</h2>
            <p className="text-richblack-200 text-sm mb-4">
                Issued on: {cert?.issuedDate 
                ? new Date(cert.issuedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) 
                : "Not available"}
            </p>
            <Link 
                to={cert.certificateUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto px-4 py-2 bg-yellow-300 text-black rounded-md hover:bg-yellow-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
                View Certificate
            </Link>
        </div>
    )
})}

                </div>
            )}
        </div>
    );
};

export default MyCertificates;















//vaishnavi08_DB_User username of db

//vMk_0804  password of db