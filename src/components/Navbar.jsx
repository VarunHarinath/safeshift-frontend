// import { Link } from 'react-router-dom';

// const Navbar = () => (
//     <nav className="bg-blue-600 p-4">
//         <ul className="flex space-x-4">
//             <li><Link to="/" className="text-white">Home</Link></li>
//             <li><Link to="/shift-logs" className="text-white">Shift Logs</Link></li>
//             <li><Link to="/safety-plans" className="text-white">Safety Plans</Link></li>
//             <li><Link to="/login" className="text-white">Login</Link></li>
//         </ul>
//     </nav>
// );

// export default Navbar;

import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Coal Mining Management</Link>
            <div>
                <Link to="/" className="mr-4 hover:underline">Home</Link>
                <Link to="/shift-logs" className="mr-4 hover:underline">Shift Logs</Link>
                <Link to="/safety-plans" className="mr-4 hover:underline">Safety Plans</Link>
                <Link to="/login" className="hover:underline">Login</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;

