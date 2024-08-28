import React, { useState } from "react";
import pets from '../db.json'

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  // Manage the full list of pets with their adoption state
  const [allPets, setAllPets] = useState(pets.pets);
  const [filteredPets, setFilteredPets] = useState(pets.pets);
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleFindPetsClick = () => {
    const newFilteredPets = selectedType !== ""
      ? allPets.filter((pet) => pet.type === selectedType)
      : allPets;
    setFilteredPets(newFilteredPets);
  };

  const handleAdoptPet = (petId) => {
    // Update the main allPets array to reflect the adoption
    const updatedPets = allPets.map((pet) =>
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    setAllPets(updatedPets);

    // Apply the filter to update the filteredPets array
    const newFilteredPets = selectedType
      ? updatedPets.filter((pet) => pet.type === selectedType)
      : updatedPets;
    setFilteredPets(newFilteredPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters pets={pets.pets} onChangeType={handleTypeChange} onFindPetsClick={handleFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={filteredPets}onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;