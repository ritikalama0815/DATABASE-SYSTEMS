import React from 'react';
import NavigateButton from '../components/NavigateButton';

const DonateNow = () => {
    return (
        <section>
            <h2>Donate Now</h2>
            <NavigateButton to="/donate">Register as Donor</NavigateButton>
        </section>
    );
};

export default DonateNow;
