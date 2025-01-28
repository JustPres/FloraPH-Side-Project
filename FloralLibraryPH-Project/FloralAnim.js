let allPlants = [];

// Fetch plants
fetch('data/plants.json')
  .then(response => response.json())
  .then(plants => {
    allPlants = plants;
    filterPlants('all'); // Show all by default
  });

// Filter by type (flower/tree/all)
function filterPlants(type) {
  const filtered = type === 'all' 
    ? allPlants 
    : allPlants.filter(plant => plant.type === type);

  // Update active tab
  document.querySelectorAll('.tab').forEach(tab => 
    tab.classList.remove('active')
  );
  event.target.classList.add('active');

  renderPlants(filtered);
}

// Render plant cards
function renderPlants(plants) {
  const plantGrid = document.getElementById('plantGrid');
  plantGrid.innerHTML = '';

  plants.forEach(plant => {
    const card = `
      <div class="plant-card" onclick="showDetail(${plant.id})">
        <img src="images/${plant.image}">
        <h3>${plant.name}</h3>
        <p><em>${plant.scientificName}</em></p>
        <p>Type: ${plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}</p>
      </div>
    `;
    plantGrid.innerHTML += card;
  });
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allPlants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm) ||
    plant.scientificName.toLowerCase().includes(searchTerm)
  );
  renderPlants(filtered);
});

// Modal functions
function showDetail(id) {
  const plant = allPlants.find(p => p.id === id);
  const modalContent = `
    <h2>${plant.name}</h2>
    <img src="images/${plant.image}" style="max-width: 300px;">
    <p><strong>Scientific Name:</strong> ${plant.scientificName}</p>
    <p><strong>Type:</strong> ${plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}</p>
    <p><strong>Medicinal Uses:</strong> ${plant.medicinalUses.join(', ')}</p>
    <p>${plant.description}</p>
  `;
  document.getElementById('modalContent').innerHTML = modalContent;
  document.getElementById('plantModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('plantModal').style.display = 'none';
}