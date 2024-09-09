import Navbar from '../components/Navbar';

const Home = () => (
    <div>
        <Navbar />
        <div className="p-4">
            <h1 className="text-2xl font-bold">Welcome to the Coal Mining Management System</h1>
            <p>This system helps you manage shift logs and safety plans efficiently.</p>
        </div>
    </div>
);

export default Home;
