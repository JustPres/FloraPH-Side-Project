let allPlants = [];

// Fetch plants from JSON
fetch('data/plants.json')
  .then(response => response.json())
  .then(plants => {
    allPlants = plants;
    filterPlants('all'); // Show all by default
  })
  .catch(error => console.error('Error loading JSON:', error));

// Filter plants by type (flower/tree/all)
function filterPlants(type) {
  const filtered = type === 'all' 
    ? allPlants 
    : allPlants.filter(plant => plant.type === type);

  // Update active tab styling
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
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <img src="images/${plant.image}" alt="${plant.name}">
      <h3>${plant.name}</h3>
      <p><em>${plant.scientificName}</em></p>
      <p>Type: ${plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}</p>
    `;
    card.onclick = () => showDetail(plant.id);
    plantGrid.appendChild(card);
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
  const modalContent = document.getElementById('modalContent');
  
  // Build modal content
  modalContent.innerHTML = `
    <h2>${plant.name}</h2>
    <img src="images/${plant.image}" style="max-width: 300px; alt="${plant.name}" class="modal-image">
    <p><strong>Scientific Name:</strong> ${plant.scientificName}</p>
    <p><strong>Type:</strong> ${plant.type.charAt(0).toUpperCase() + plant.type.slice(1)}</p>
    <p><strong>Region:</strong> ${plant.region}</p>
    <p><strong>Medicinal Uses:</strong></p>
    <ul>${plant.medicinalUses.map(use => `<li>${use}</li>`).join('')}</ul>
    <div class="modal-links">
      ${plant.reference ? `<a href="${plant.reference}" target="_blank" class="reference-link">🔗 Image Reference</a>` : ''}
      ${plant.downloadLink ? `<a href="${plant.downloadLink}" download class="download-btn">⬇️ Download Image</a>` : ''}
    </div>
    <p class="description">${plant.description}</p>
  `;

  // Show modal
  document.getElementById('plantModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('plantModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById('plantModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};