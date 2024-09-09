import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ShiftLogList = () => {
    const [shiftLogs, setShiftLogs] = useState([]);
    const [summaries, setSummaries] = useState({}); // Store summaries for each log

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shiftLogs', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setShiftLogs(response.data);
            } catch (err) {
                console.error('Error fetching shift logs:', err);
            }
        };

        fetchLogs();
    }, []);

    const generateSummary = async (logId) => {
        const log = shiftLogs.find(log => log._id === logId);
        if (!log) return;

        try {
            const response = await axios.post('http://localhost:5000/api/summarize/summarize', { shiftLogs: [log] }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setSummaries(prevSummaries => ({ ...prevSummaries, [logId]: response.data.summary }));
        } catch (err) {
            console.error('Error generating summary:', err);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        shiftLogs.forEach((log, index) => {
            let y = 10;
            if (index > 0) doc.addPage();

            doc.text(`Shift Log ${index + 1}`, 10, y);
            y += 10;
            doc.text(`Date: ${log.date}`, 10, y);
            y += 10;
            doc.text(`Shift: ${log.shift}`, 10, y);
            y += 10;
            doc.text(`Total Tonnage Mined: ${log.productionData.totalTonnageMined}`, 10, y);
            y += 10;
            doc.text(`Active Machines: ${log.productionData.activeMachines}`, 10, y);
            y += 10;
            doc.text(`Machine Downtime: ${log.productionData.machineDowntime}`, 10, y);
            y += 10;
            doc.text(`Additional Notes: ${log.productionData.additionalNotes}`, 10, y);
            y += 10;
            doc.text(`Incidents: ${log.safetyReports.incidents}`, 10, y);
            y += 10;
            doc.text(`Near Misses: ${log.safetyReports.nearMisses}`, 10, y);
            y += 10;
            doc.text(`Hazards Identified: ${log.safetyReports.hazardsIdentified}`, 10, y);
            y += 10;
            doc.text(`Completed Tasks: ${log.workProgress.completedTasks}`, 10, y);
            y += 10;
            doc.text(`Ongoing Work: ${log.workProgress.ongoingWork}`, 10, y);
            y += 10;
            doc.text(`Upcoming Work: ${log.workProgress.upcomingWork}`, 10, y);
            y += 10;
            doc.text(`Machine Status: Excavator: ${log.machineStatus.excavator}, Conveyor: ${log.machineStatus.conveyor}, Crusher: ${log.machineStatus.crusher}`, 10, y);
            y += 10;
            doc.text(`Shift Supervisor: ${log.personnelInformation.shiftSupervisor}`, 10, y);
            y += 10;
            doc.text(`Key Personnel Changes: ${log.personnelInformation.keyPersonnelChanges}`, 10, y);
            y += 10;
            doc.text(`Notes for Incoming Shift: ${log.notesForIncomingShift}`, 10, y);
            y += 10;
            doc.text(`Signed By: ${log.signedBy}`, 10, y);
            y += 10;
            doc.text(`Time: ${log.time}`, 10, y);

            // Include summary if available
            if (summaries[log._id]) {
                y += 10;
                doc.text(`Summary: ${summaries[log._id]}`, 10, y);
            }
        });

        doc.save('shift_logs.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(shiftLogs.map(log => ({
            Date: log.date,
            Shift: log.shift,
            TotalTonnageMined: log.productionData.totalTonnageMined,
            ActiveMachines: log.productionData.activeMachines,
            MachineDowntime: log.productionData.machineDowntime,
            AdditionalNotes: log.productionData.additionalNotes,
            Incidents: log.safetyReports.incidents,
            NearMisses: log.safetyReports.nearMisses,
            HazardsIdentified: log.safetyReports.hazardsIdentified,
            CompletedTasks: log.workProgress.completedTasks,
            OngoingWork: log.workProgress.ongoingWork,
            UpcomingWork: log.workProgress.upcomingWork,
            MachineStatusExcavator: log.machineStatus.excavator,
            MachineStatusConveyor: log.machineStatus.conveyor,
            MachineStatusCrusher: log.machineStatus.crusher,
            ShiftSupervisor: log.personnelInformation.shiftSupervisor,
            KeyPersonnelChanges: log.personnelInformation.keyPersonnelChanges,
            NotesForIncomingShift: log.notesForIncomingShift,
            SignedBy: log.signedBy,
            Time: log.time,
            // Add summary column
            Summary: summaries[log._id] || ''
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Shift Logs');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'shift_logs.xlsx');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Shift Logs</h1>
            <div className="mb-4">
                <button onClick={exportToPDF} className="bg-blue-600 text-white p-2 rounded mr-2">Export to PDF</button>
                <button onClick={exportToExcel} className="bg-blue-600 text-white p-2 rounded">Export to Excel</button>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Shift</th>
                        <th className="py-2 px-4 border-b">Total Tonnage Mined</th>
                        <th className="py-2 px-4 border-b">Active Machines</th>
                        <th className="py-2 px-4 border-b">Machine Downtime</th>
                        <th className="py-2 px-4 border-b">Additional Notes</th>
                        <th className="py-2 px-4 border-b">Incidents</th>
                        <th className="py-2 px-4 border-b">Near Misses</th>
                        <th className="py-2 px-4 border-b">Hazards Identified</th>
                        <th className="py-2 px-4 border-b">Completed Tasks</th>
                        <th className="py-2 px-4 border-b">Ongoing Work</th>
                        <th className="py-2 px-4 border-b">Upcoming Work</th>
                        <th className="py-2 px-4 border-b">Machine Status</th>
                        <th className="py-2 px-4 border-b">Shift Supervisor</th>
                        <th className="py-2 px-4 border-b">Key Personnel Changes</th>
                        <th className="py-2 px-4 border-b">Notes for Incoming Shift</th>
                        <th className="py-2 px-4 border-b">Signed By</th>
                        <th className="py-2 px-4 border-b">Time</th>
                        <th className="py-2 px-4 border-b">Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {shiftLogs.map((log) => (
                        <tr key={log._id}>
                            <td className="py-2 px-4 border-b">{log.date}</td>
                            <td className="py-2 px-4 border-b">{log.shift}</td>
                            <td className="py-2 px-4 border-b">{log.productionData.totalTonnageMined}</td>
                            <td className="py-2 px-4 border-b">{log.productionData.activeMachines}</td>
                            <td className="py-2 px-4 border-b">{log.productionData.machineDowntime}</td>
                            <td className="py-2 px-4 border-b">{log.productionData.additionalNotes}</td>
                            <td className="py-2 px-4 border-b">{log.safetyReports.incidents}</td>
                            <td className="py-2 px-4 border-b">{log.safetyReports.nearMisses}</td>
                            <td className="py-2 px-4 border-b">{log.safetyReports.hazardsIdentified}</td>
                            <td className="py-2 px-4 border-b">{log.workProgress.completedTasks}</td>
                            <td className="py-2 px-4 border-b">{log.workProgress.ongoingWork}</td>
                            <td className="py-2 px-4 border-b">{log.workProgress.upcomingWork}</td>
                            <td className="py-2 px-4 border-b">{`Excavator: ${log.machineStatus.excavator}, Conveyor: ${log.machineStatus.conveyor}, Crusher: ${log.machineStatus.crusher}`}</td>
                            <td className="py-2 px-4 border-b">{log.personnelInformation.shiftSupervisor}</td>
                            <td className="py-2 px-4 border-b">{log.personnelInformation.keyPersonnelChanges}</td>
                            <td className="py-2 px-4 border-b">{log.notesForIncomingShift}</td>
                            <td className="py-2 px-4 border-b">{log.signedBy}</td>
                            <td className="py-2 px-4 border-b">{log.time}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => generateSummary(log._id)}
                                    className="bg-green-600 text-white p-1 rounded"
                                >
                                    Summarize
                                </button>
                            </td> {/* Button to generate summary */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShiftLogList;
