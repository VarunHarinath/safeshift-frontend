import SafetyPlanForm from '../components/SafetyPlanForm';
import SafetyPlanList from '../components/SafetyPlanList';
import Navbar from '../components/Navbar';

const SafetyPlans = () => (
    <div>
        <Navbar />
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Safety Plans</h1>
            <SafetyPlanForm />
            <SafetyPlanList />
        </div>
    </div>
);

export default SafetyPlans;
