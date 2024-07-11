import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';

function App() {
    const [showDropdown, setShowDropdown] = useState(false);
    const users = [
        {
            name: 'John Doe',
            course: 'React',
            date: '2021-04-11',
        },
        {
            name: 'Jane Doe',
            course: 'Python',
            date: '2024-09-01',
        },
        {
            name: 'Alice Doe',
            course: 'JavaScript',
            date: '2023-12-31',
        },
        {
            name: 'Bob Doe',
            course: 'HTML',
            date: '2022-06-15',
        }
    ];

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <>
            <div className="inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <header className="top-0 flex items-center justify-between p-2">
                    <button
                        onClick={() => window.location.href = "/"}
                        className="text-4xl font-extrabold text-white"
                    >
                        TUTEDUDE
                    </button>

                    {window.location.href === "http://localhost:5173/" && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
                            onClick={() => window.location.href = "/past"}
                            
                        >
                            Issued Certificates
                        </button>
                    )}

                    <div className="relative">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 m-2 text-white font-bold py-2 px-5 rounded-full"
                            onClick={toggleDropdown}
                            onBlur={toggleDropdown}
                        >
                            <BiBell />
                        </button>

                        {showDropdown && (
                            <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 px-2">
                                    {users.map((user) => (
                                        <div
                                            key={user.name}
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {user.name} requests a certificate for {user.course} completed on {user.date}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                <Outlet />
            </div>
        </>
    );
}

export default App;
