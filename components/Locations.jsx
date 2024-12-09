import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const RADIUS_KM = 50; 
const GOOGLE_API_KEY = "AIzaSyDSFP22siIRUwUFNyE79Q3v-2GQVVJZgwY"; 

const getNearbyLocations = async (lat, lng, radius, type) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius * 1000}&type=${type}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      return data.results.map((place) => ({
        name: place.name,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        address: place.vicinity,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
    return [];
  }
};

const Locations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          // If user denies location access
          setUserLocation(null);
        }
      );
    }
  }, []);

  // Fetch nearby locations
  useEffect(() => {
    const fetchLocations = async () => {
      if (userLocation) {
        setLoading(true);
        const clinics = await getNearbyLocations(
          userLocation.lat,
          userLocation.lng,
          RADIUS_KM,
          "clinic"
        );

        if (clinics.length === 0) {
          const hospitals = await getNearbyLocations(
            userLocation.lat,
            userLocation.lng,
            RADIUS_KM,
            "hospital"
          );
          setNearbyLocations(hospitals);
        } else {
          setNearbyLocations(clinics);
        }
        setLoading(false);
      }
    };

    fetchLocations();
  }, [userLocation]);

  // Handle location selection from autocomplete
  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setUserLocation({ lat: lat(), lng: lng() });
      }
    }
  };

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <section id="locations" className="locations-section">
      <h2>Find Nearby Locations</h2>
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
        <div style={{ marginBottom: "10px" }}>
          {/* Autocomplete Input */}
          <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Type a location..."
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
          </Autocomplete>
        </div>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={userLocation ? 12 : 2}
        >
          {/* Marker for user's location */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your Location"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}

          {/* Markers for nearby locations */}
          {nearbyLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {loading ? (
        <p>Loading nearby locations...</p>
      ) : nearbyLocations.length > 0 ? (
        <ul>
          {nearbyLocations.map((location, index) => (
            <li key={index}>
              <strong>{location.name}</strong>: {location.address || "Address not available"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No nearby locations found.</p>
      )}
    </section>
  );
};

export default Locations;
