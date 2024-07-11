import { useState } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';

const CertificateForm = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8001/api/certificate/generate', { name, course, date, email });
            console.log(response);
            window.open(response.data.certificate.pdfLink, '_blank')
            window.location.href = response.data.certificate.downloadLink;
            setLoading(false);
            setMessage('Certificate Generated Successfully');
        } catch (error) {
            setLoading(false);
            setMessage('Error generating certificate');
            console.error(error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-white text-center">Generate Certificate</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Course:</label>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-white">Email: <span className='font-light'>(optional)</span></label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                    >
                        {loading && <LuLoader className="mr-2 h-6 w-6 animate-spin" />}
                        <span className='flex flex-row gap-2'>
                            Generate Certificate
                        </span>
                    </button>

                </form>
                {!loading && message && <p className="mt-6 text-center text-green-500">{message}</p>}
            </div>
        </div>
    );
};

export default CertificateForm;
