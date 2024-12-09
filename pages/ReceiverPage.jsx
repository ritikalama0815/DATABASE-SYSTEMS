import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFetchAllReceiversQuery, useCreateReceiverMutation, useFindMatchingDonorsQuery } from '../redux/receivers/receiversApi';
import NavigateButton from '../components/NavigateButton';

const ReceiverPage = () => {
    const dispatch = useDispatch();
    const [createReceiver, { isLoading }] = useCreateReceiverMutation();
    const { data: receivers, error: fetchError } = useFetchAllReceiversQuery();
    const [showMatches, setShowMatches] = useState(false);
    const [submittedCriteria, setSubmittedCriteria] = useState(null);

    const [formData, setFormData] = useState({
        type: '',
        blood_type: '',
        reason: ''
    });

    const { data: matchingDonors, isFetching: isLoadingDonors } = useFindMatchingDonorsQuery(
        submittedCriteria,
        { skip: !submittedCriteria } // Only fetch after form submission
    );
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form data:', formData); // Log form data
            await createReceiver(formData).unwrap();
            
            // Set the criteria and log it
            const criteria = {
                type: formData.type,
                blood_type: formData.blood_type
            };
            console.log('Setting search criteria:', criteria);
            setSubmittedCriteria(criteria);
            setShowMatches(true);
    
            alert('Receiver registration successful!');
        } catch (error) {
            console.error('Failed to submit receiver information:', error);
            alert('Failed to register receiver. Please try again.');
        }
    };
    return (
        <div>
            <h1>Register as Receiver</h1>
            <p>Fill out the form to register as a blood or organ receiver.</p>
            
            {fetchError && <p style={{ color: 'red' }}>Error: {fetchError.message}</p>}
            
            <form onSubmit={handleSubmit}>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="Blood">Blood</option>
                    <option value="Organ">Organ</option>
                </select>

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

                <textarea
                    name="reason"
                    placeholder="Reason for receiving donation"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                />

                <button 
                    type="submit" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Register as Receiver'}
                </button>
            </form>

            {showMatches && (
                <div>
                    <h2>Compatible Donors Found</h2>
                    {isLoadingDonors ? (
                        <p>Finding matching donors...</p>
                    ) : matchingDonors?.length > 0 ? (
                        <div>
                            <ul>
                                {matchingDonors.map((donor) => (
                                    <li 
                                        key={donor._id}
                                        style={{
                                            padding: '15px',
                                            margin: '10px 0',
                                            border: '1px solid #ddd',
                                            borderLeft: donor.compatibility.isPerfectMatch 
                                                ? '5px solid green' 
                                                : donor.compatibility.isUniversalDonor 
                                                    ? '5px solid blue' 
                                                    : '5px solid orange',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <div style={{ marginBottom: '5px' }}>
                                            <span style={{ 
                                                padding: '2px 6px',
                                                borderRadius: '3px',
                                                backgroundColor: donor.compatibility.isPerfectMatch 
                                                    ? '#e7f7e7' 
                                                    : donor.compatibility.isUniversalDonor 
                                                        ? '#e7f1ff' 
                                                        : '#fff3e0',
                                                marginRight: '10px'
                                            }}>
                                                {donor.compatibility.isPerfectMatch 
                                                    ? 'Perfect Match' 
                                                    : donor.compatibility.isUniversalDonor 
                                                        ? 'Universal Donor' 
                                                        : 'Compatible'}
                                            </span>
                                        </div>
                                        <p>
                                            <strong>Name:</strong> {donor.name}<br />
                                            <strong>Blood Type:</strong> {donor.blood_type}<br />
                                            <strong>Type:</strong> {donor.type}<br />
                                            <strong>Location:</strong> {donor.location}<br />
                                            <strong>Contact:</strong> {donor.contact}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                                <p><strong>Compatibility Chart:</strong></p>
                                <p>🟢 Perfect blood type match</p>
                                <p>🔵 Universal donor (O-)</p>
                                <p>🟡 Compatible but different blood type</p>
                            </div>
                        </div>
                    ) : (
                        <p>No compatible donors found for your requirements.</p>
                    )}
                </div>
            )}            <NavigateButton to="/">Back to Home</NavigateButton>
        </div>
    );
};

export default ReceiverPage;