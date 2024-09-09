import ShiftLogForm from '../components/ShiftLogForm';
import ShiftLogList from '../components/ShiftLogList';
import Navbar from '../components/Navbar';

const ShiftLogs = () => (
    <div>
        <Navbar />
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shift Logs</h1>
            <ShiftLogForm />
            <ShiftLogList />
        </div>
    </div>
);

export default ShiftLogs;
