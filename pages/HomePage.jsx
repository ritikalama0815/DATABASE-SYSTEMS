import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Locations from "../components/Locations";
import Testimonials from "../components/Testimonials";
// import DonorInfo from "../components/DonorInfo";
// import RecipientInfo from "../components/RecipientInfo";
import "../styles/HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("donors"); // Manage active tab
  const [popupContent, setPopupContent] = useState(""); // Manage popup content
  const [isPopupVisible, setPopupVisible] = useState(false); // Popup visibility
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  // Handle tab clicks for donor/recipient info
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle the popup modal content based on different types
  const handlePopup = (type) => {
    let content = "";
    switch (type) {
      case "eligibility":
        content = `
          <strong>Eligibility for Blood Donation:</strong><br />
          1. Donation frequency: Every 112 days, up to 3 times/year.<br />
          2. You must be in good health and feeling well.<br />
          3. Male donors must be at least 17 years old in most states, at least 5'1" tall, and weigh at least 130 lbs.<br />
          4. Female donors must be at least 19 years old, at least 5'3" tall, and weigh at least 150 lbs.
        `;
        break;
      case "types":
        content = `
          <strong>Types of Organ Donations:</strong><br />
          1. Kidney<br />
          2. Liver<br />
          3. Heart<br />
          4. Eyes<br />
          5. Skin<br />
          6. Other vital organs and tissues.
        `;
        break;
      case "process":
        content = `
          <strong>Donation Process:</strong><br />
          1. Obtain consent for donation.<br />
          2. Undergo medical evaluation to determine eligibility.<br />
          3. Matching with the recipient based on compatibility.<br />
          4. Completion of the donation procedure.
        `;
        break;
      case "recipient-eligibility":
        content = `
          <strong>Eligibility for Recipients:</strong><br />
          1. Patients with severe blood loss (e.g., surgery, trauma, childbirth).<br />
          2. Individuals with organ failure (e.g., kidney or liver failure).<br />
          3. Eligibility determined by medical urgency and healthcare provider recommendations.
        `;
        break;
      case "matching":
        content = `
          <strong>Matching Requirements:</strong><br />
          1. Blood Transfusion: ABO and Rh factor compatibility.<br />
          2. Organ Transplant: Matching based on tissue type and HLA compatibility.<br />
          3. Matching ensures safety and minimizes the risk of rejection.
        `;
        break;
      case "blood-compatibility":
        content = `
          <strong>Blood Group Compatibility:</strong><br />
          <table border="1" cellspacing="0" cellpadding="5">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Can Donate To</th>
                <th>Can Receive From</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>O-</td>
                <td>All Blood Types (Universal Donor)</td>
                <td>O-</td>
              </tr>
              <tr>
                <td>O+</td>
                <td>O+, A+, B+, AB+</td>
                <td>O+, O-</td>
              </tr>
              <tr>
                <td>A-</td>
                <td>A-, A+, AB-, AB+</td>
                <td>A-, O-</td>
              </tr>
              <tr>
                <td>A+</td>
                <td>A+, AB+</td>
                <td>A+, A-, O+, O-</td>
              </tr>
              <tr>
                <td>B-</td>
                <td>B-, B+, AB-, AB+</td>
                <td>B-, O-</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>B+, AB+</td>
                <td>B+, B-, O+, O-</td>
              </tr>
              <tr>
                <td>AB-</td>
                <td>AB-, AB+</td>
                <td>AB-, A-, B-, O-</td>
              </tr>
              <tr>
                <td>AB+</td>
                <td>AB+ (Universal Recipient)</td>
                <td>All Blood Types</td>
              </tr>
            </tbody>
          </table>
        `;
        break;
        case "eligible":
        content = `
          A phlebotomist will draw a unit of blood, which is usually 350-450 ml. &#128512 
        `;
        break;
        case "organ":
        content = `
          There is no age limit to sign up. You can sign up regardless 
          of any preexisting or past medical conditions. However, some conditions 
          may prevent you from becoming a donor, such as an actively spreading cancer 
          or infection. &#128519
        `;
        break;
        case "register":
        content = `
          To register as a blood or organ recipient:<br />

          1. Contact your local hospital or transplant center<br />
          2. Get evaluated by medical professionals<br />
          3. Join the national organ recipient waiting list<br />
          4. Complete required medical screenings<br />
          5. Maintain ongoing communication with healthcare providers<br />
        `;
        break;
        case "organ-matching":
        content = `
          Organ matching is a complex process involving compatibility factors like 
          blood type, tissue typing, and genetic markers. The recipient's medical urgency,
           geographic location, and physical compatibility are carefully evaluated. 
           Medical professionals use sophisticated algorithms to ensure the most suitable 
           match, considering the patient's overall health, time on the waiting list, and 
           potential for successful transplantation. Organizations like UNOS coordinate this 
           intricate system to allocate organs as fairly and effectively as possible, 
           prioritizing both medical need and the likelihood of a successful outcome.
        `;
        break;
        case "family":
        content = `
          After organ donation, the donor's family receives compassionate support 
          from medical staff. They are offered grief counseling and may be provided 
          anonymous information about how their loved one's organs saved other lives. 
          Many families find solace in knowing their loss helped multiple people through 
          organ donation. Hospital teams work sensitively to support the family during 
          this emotional process.
        `;
        break;
      default:
        content = "Unknown content.";
    }
    setPopupContent(content);
    setPopupVisible(true);
  };

  
  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleDonateClick = () => {
    navigate("/donate");
  };

  const handleReceiversClick = () => {
    navigate("/receivers");
  };

  return (
    <div className={`homepage ${isPopupVisible ? 'popup-visible' : ''} ${testimonialsVisible ? 'testimonials-visible' : ''}`}>
      <header className="header">
        <div className="logo">BOMB</div>
        <nav className="nav">
          <a href="#donor-info">Donor Info</a>
          <a href="#recipient-info">Recipient Info</a>
          <a href="#testimonials" onClick={() => setTestimonialsVisible(true)}>Testimonials</a>
          <a href="#locations">Locations</a>
          <button onClick={handleDonateClick}>Donate Now</button>
        </nav>
      </header>

      <section className="hero">
          <h1>Donate Blood, Donate Organs</h1>
          <p>Not all heroes wear capes.</p>
          <div className="hero-buttons">
            <button onClick={handleDonateClick}>Register as Donor</button>
            <button onClick={handleReceiversClick}>Register as Receiver</button>
          </div>
      </section>

      <section className="info-section">
        <h2>Blood and Organ Donation Information</h2>
        <div className="tabs">
          <button
            className={`tab tab-donors ${activeTab === "donors" ? "active" : ""}`}
            onClick={() => handleTabClick("donors")}
          >
            For Donors
          </button>
          <button
            className={`tab tab-recipient ${activeTab === "recipients" ? "active" : ""}`}
            onClick={() => handleTabClick("recipients")}
          >
            For Recipients
          </button>
        </div>

        {activeTab === "donors" && (
          <div className="info-box">
            <h3>Information for Donors</h3>
            <ul>
              <li>
                <span className="clickable" onClick={() => handlePopup("eligibility")}>
                  Eligibility criteria for blood donation
                </span>
              </li>
              <li>
                <span className="clickable" onClick={() => handlePopup("types")}>
                  Types of organ donations
                </span>
              </li>
              <li>
                <span className="clickable" onClick={() => handlePopup("process")}>
                  The donation process
                </span>
              </li>
              <li>
                <span className="clickable" onClick={() => handlePopup("blood-compatibility")}>
                  Blood Compatibility
                </span>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "recipients" && (
          <div className="info-box">
            <h3>Information for Recipients</h3>
            <ul>
              <li>
                <span className="clickable" onClick={() => handlePopup("recipient-eligibility")}>
                  Eligibility criteria for organ recipients
                </span>
              </li>
              <li>
                <span className="clickable" onClick={() => handlePopup("matching")}>
                  Matching process for donors and recipients
                </span>
              </li>
              <li>
                <span className="clickable" onClick={() => handlePopup("organ-matching")}>
                  Organ Matching Process
                </span>
              </li>
            </ul>
          </div>
        )}
      </section>

      <Locations />

        {/* //popup */}
        {isPopupVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <p dangerouslySetInnerHTML={{ __html: popupContent }} />
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      {testimonialsVisible && (
        <Testimonials setTestimonialsVisible={setTestimonialsVisible} />
      )}


      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>FAQs</h3>
            <ul>
              <li><a href="#faq1" onClick={() => handlePopup("eligible")}>How to donate blood?</a></li>
              <li><a href="#faq2" onClick={() => handlePopup("organ")}>Who can donate organs?</a></li>
              <li><a href="#faq3" onClick={() => handlePopup("register")}>How to register as a recipient?</a></li>
              <li><a href="#faq4" onClick={() => handlePopup("organ-matching")}>How are organs matched to recipients?</a></li>
              <li><a href="#faq5" onClick={() => handlePopup("family")}>What happens to the donor's family?</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Information</h3>
            <p>Email: support@bomb.com</p>
            <p>Phone: +1-123-456-4567</p>
            <p>Address: 123 Donation St, Kirksville, USA</p>
          </div>
          <div className="footer-section">
            <h3>Social Media</h3>
            <ul className="social-links">
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-use">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Donation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
