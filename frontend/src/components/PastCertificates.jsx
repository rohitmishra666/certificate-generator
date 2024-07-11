import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(import.meta.env.BACKEND_URL);
                console.log(response)
                setCertificates(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching certificates');
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    if (loading) {
        return <p className="text-center mt-6 text-gray-700">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-6 text-red-600">{error}</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <h1 className="text-2xl font-serif mb-6 text-white">Past Certificates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {certificates.map((certificate) => (
                    <div key={certificate._id} className="bg-inherit p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-300">{certificate.name}</h2>
                        <p className="text-gray-300">{certificate.course}</p>
                        <p className="text-gray-300">{new Date(certificate.date).toLocaleDateString()}</p>
                        <a
                            href={certificate.downloadLink}
                            className="mt-4 inline-block text-blue-500 hover:text-blue-700"
                            download
                        >
                            Download Certificate
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCertificates;
