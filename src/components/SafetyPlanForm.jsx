import { useState } from 'react';
import axios from 'axios';

const SafetyPlanForm = () => {
    const [planId, setPlanId] = useState('');
    const [hazards, setHazards] = useState('');
    const [controls, setControls] = useState('');
    const [responsibilities, setResponsibilities] = useState('');
    const [complianceStatus, setComplianceStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/safetyPlans', { planId, hazards, controls, responsibilities, complianceStatus }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            // Clear form and show success message
            setPlanId('');
            setHazards('');
            setControls('');
            setResponsibilities('');
            setComplianceStatus('');
        } catch (err) {
            console.error('Error submitting safety plan:', err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Safety Plan</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Plan ID</label>
                    <input
                        type="text"
                        value={planId}
                        onChange={(e) => setPlanId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Hazards</label>
                    <textarea
                        value={hazards}
                        onChange={(e) => setHazards(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Controls</label>
                    <textarea
                        value={controls}
                        onChange={(e) => setControls(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Responsibilities</label>
                    <textarea
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Compliance Status</label>
                    <input
                        type="text"
                        value={complianceStatus}
                        onChange={(e) => setComplianceStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default SafetyPlanForm;
