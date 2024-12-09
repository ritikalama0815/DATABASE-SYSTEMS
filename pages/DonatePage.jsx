import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFormInfo } from '../redux/features/forms/formSlice';
import { useCreateDonorMutation, useFetchAllDonorsQuery } from '../redux/donors/donorsApi';
import NavigateButton from '../components/NavigateButton';
import '../styles/DonatePage.css';

const DonatePage = () => {
    const dispatch = useDispatch();
    const [createDonor, { isLoading }] = useCreateDonorMutation();
    const { data: donors, isLoading: isLoadingDonors } = useFetchAllDonorsQuery();

    const [formData, setFormData] = useState({
        name: '',
        blood_type: '',
        type: '',
        //infectious_transmitted_disease: false,
        location: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createDonor(formData).unwrap();
            dispatch(saveFormInfo(result));
            setFormData({
                name: '',
                blood_type: '',
                type: '',
                //infectious_transmitted_disease: false,
                location: '',
                contact: ''
            });
            alert('Donor registration successful!');
        } catch (submitError) {
            console.error('Failed to submit donor information:', submitError);
            alert('Failed to register donor. Please try again.');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register as Donor</h1>
            <p className="mb-6">Fill out the form to register as a blood or organ donor.</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    
                    <select
                        name="blood_type"
                        value={formData.blood_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Donation Type</option>
                        <option value="Blood">Blood</option>
                        <option value="Organ">Organ</option>
                    </select>

                    

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />

                    {/* <select
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Contact Method</option>
                        <option value="Phone Number">Phone Number</option>
                        <option value="Email">Email</option>
                    </select> */}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Register as Donor'}
                    </button>
                </div>
            </form>

            {/* Donors List Section */}
            <div className="donors-list">
    {donors && donors.length > 0 ? (
        donors.map((donor) => (
            <div key={donor._id} className="donor-item">
                <div className="donor-info">
                    <h3 className="donor-name">{donor.name}</h3>
                    <p><span className="font-medium">Blood Type:</span> {donor.blood_type}</p>
                    <p><span className="font-medium">Donation Type:</span> {donor.type}</p>
                    <p><span className="font-medium">Location:</span> {donor.location}</p>
                    <p><span className="font-medium">Contact Method:</span> {donor.contact}</p>                </div>
                <div className={`donor-type ${donor.type.toLowerCase()}`}>
                    {donor.type}
                </div>
            </div>
        ))
    ) : (
        <p>No donors registered yet.</p>
    )}
</div>


            <NavigateButton to="/" className="mt-6">Back to Home</NavigateButton>
        </div>
    );
};

export default DonatePage;