import { useState } from 'react';
import axios from 'axios';

const ShiftLogForm = () => {
    const [shiftLogData, setShiftLogData] = useState({
        date: '',
        shift: '',
        productionData: {
            totalTonnageMined: '',
            activeMachines: '',
            machineDowntime: '',
            additionalNotes: ''
        },
        safetyReports: {
            incidents: '',
            nearMisses: '',
            hazardsIdentified: ''
        },
        workProgress: {
            completedTasks: '',
            ongoingWork: '',
            upcomingWork: ''
        },
        machineStatus: {
            excavator: '',
            conveyor: '',
            crusher: ''
        },
        personnelInformation: {
            shiftSupervisor: '',
            keyPersonnelChanges: ''
        },
        notesForIncomingShift: '',
        signedBy: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShiftLogData((prevData) => {
            const [section, field] = name.split('.');
            if (field) {
                return {
                    ...prevData,
                    [section]: {
                        ...prevData[section],
                        [field]: value
                    }
                };
            }
            return { ...prevData, [name]: value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/shiftLogs', shiftLogData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Shift log submitted successfully');
        } catch (err) {
            console.error('Error submitting shift log:', err);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Submit Shift Log</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={shiftLogData.date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="shift"
                    placeholder="Shift (e.g., Morning)"
                    value={shiftLogData.shift}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />

                <h2 className="text-xl font-semibold mb-2">Production Data</h2>
                <input
                    type="number"
                    name="productionData.totalTonnageMined"
                    placeholder="Total Tonnage Mined"
                    value={shiftLogData.productionData.totalTonnageMined}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="productionData.activeMachines"
                    placeholder="Active Machines"
                    value={shiftLogData.productionData.activeMachines}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="productionData.machineDowntime"
                    placeholder="Machine Downtime"
                    value={shiftLogData.productionData.machineDowntime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="productionData.additionalNotes"
                    placeholder="Additional Notes"
                    value={shiftLogData.productionData.additionalNotes}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">Safety Reports</h2>
                <input
                    type="text"
                    name="safetyReports.incidents"
                    placeholder="Incidents"
                    value={shiftLogData.safetyReports.incidents}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="safetyReports.nearMisses"
                    placeholder="Near Misses"
                    value={shiftLogData.safetyReports.nearMisses}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="safetyReports.hazardsIdentified"
                    placeholder="Hazards Identified"
                    value={shiftLogData.safetyReports.hazardsIdentified}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">Work Progress</h2>
                <input
                    type="text"
                    name="workProgress.completedTasks"
                    placeholder="Completed Tasks"
                    value={shiftLogData.workProgress.completedTasks}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="workProgress.ongoingWork"
                    placeholder="Ongoing Work"
                    value={shiftLogData.workProgress.ongoingWork}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="workProgress.upcomingWork"
                    placeholder="Upcoming Work"
                    value={shiftLogData.workProgress.upcomingWork}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">Machine Status</h2>
                <input
                    type="text"
                    name="machineStatus.excavator"
                    placeholder="Excavator Status"
                    value={shiftLogData.machineStatus.excavator}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="machineStatus.conveyor"
                    placeholder="Conveyor Status"
                    value={shiftLogData.machineStatus.conveyor}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="machineStatus.crusher"
                    placeholder="Crusher Status"
                    value={shiftLogData.machineStatus.crusher}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <h2 className="text-xl font-semibold mb-2">Personnel Information</h2>
                <input
                    type="text"
                    name="personnelInformation.shiftSupervisor"
                    placeholder="Shift Supervisor"
                    value={shiftLogData.personnelInformation.shiftSupervisor}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="personnelInformation.keyPersonnelChanges"
                    placeholder="Key Personnel Changes"
                    value={shiftLogData.personnelInformation.keyPersonnelChanges}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <input
                    type="text"
                    name="notesForIncomingShift"
                    placeholder="Notes for Incoming Shift"
                    value={shiftLogData.notesForIncomingShift}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="signedBy"
                    placeholder="Signed By"
                    value={shiftLogData.signedBy}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={shiftLogData.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default ShiftLogForm;
