import React, { useState, useEffect } from 'react';
import Map from './Map';

//Styles and components
import './CreatePin.css';

const PinForm = ({ addPin, selectedLocation, setSelectedLocation }) => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const [newPin, setNewPin] = useState(null);
  

  useEffect(() => {
    if (selectedLocation) {
      setNewPin({
        caption,
        location: [selectedLocation.lat, selectedLocation.lng],
        // You can add other properties as needed
      });
    }
  }, [selectedLocation, caption]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a location is selected
    if (!newPin || !newPin.location) {
      alert('Please select a location on the map');
      return;
    }

    // TODO: Implement photo upload logic (e.g., using FormData)

    // Call the addPin function to send the new pin to the backend
    addPin(newPin);
  };

  

  return (
    <form className="pin-form" onSubmit={handleSubmit}>
      <label>
        Caption:
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </label>
      {/* Use the Map component for location selection */}
      {selectedLocation && <Map pins={[]} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />}

      <button type="submit">Add Pin</button>
    </form>
  );
};

export default PinForm;
