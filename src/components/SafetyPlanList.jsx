import { useEffect, useState } from 'react';
import axios from 'axios';

const SafetyPlanList = () => {
    const [safetyPlans, setSafetyPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/safetyPlans', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                setSafetyPlans(response.data);
            } catch (err) {
                console.error('Error fetching safety plans:', err);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Safety Plans</h1>
            <ul>
                {safetyPlans.map((plan) => (
                    <li key={plan._id} className="border-b border-gray-300 p-2">
                        <h2 className="text-lg font-semibold">Plan ID: {plan.planId}</h2>
                        <p>Hazards: {plan.hazards}</p>
                        <p>Controls: {plan.controls}</p>
                        <p>Responsibilities: {plan.responsibilities}</p>
                        <p>Compliance Status: {plan.complianceStatus}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SafetyPlanList;
