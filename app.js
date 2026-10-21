// Dwel Minimalist Architecture Interactive App

document.addEventListener('DOMContentLoaded', () => {
  // Configurator state
  let selectedModelPrice = 145000;
  let selectedModelName = "Cabin (45m²)";
  let selectedCladdingPrice = 0;
  let selectedCladdingName = "Charred Shou Sugi Ban";
  let selectedEnergyPrice = 0;
  let selectedEnergyName = "Grid Ready Standard";
  let selectedFinishPrice = 0;
  let selectedFinishName = "Nordic Birch Plywood";

  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const summaryModel = document.getElementById('summaryModel');
  const summaryCladding = document.getElementById('summaryCladding');
  const summaryEnergy = document.getElementById('summaryEnergy');
  const summaryFinish = document.getElementById('summaryFinish');

  function updatePrice() {
    const total = selectedModelPrice + selectedCladdingPrice + selectedEnergyPrice + selectedFinishPrice;
    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = `$${total.toLocaleString()}`;
    }
    if (summaryModel) summaryModel.textContent = selectedModelName;
    if (summaryCladding) summaryCladding.textContent = selectedCladdingName;
    if (summaryEnergy) summaryEnergy.textContent = selectedEnergyName;
    if (summaryFinish) summaryFinish.textContent = selectedFinishName;
  }

  // Segment button handling
  function setupSegmentGroup(containerId, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.btn-seg');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const price = parseInt(btn.getAttribute('data-value')) || 0;
        const name = btn.getAttribute('data-name');
        onSelect(price, name);
        updatePrice();
      });
    });
  }

  setupSegmentGroup('modelSelectGroup', (price, name) => {
    selectedModelPrice = price;
    selectedModelName = name;
  });

  setupSegmentGroup('claddingGroup', (price, name) => {
    selectedCladdingPrice = price;
    selectedCladdingName = name;
  });

  setupSegmentGroup('energyGroup', (price, name) => {
    selectedEnergyPrice = price;
    selectedEnergyName = name;
  });

  setupSegmentGroup('finishGroup', (price, name) => {
    selectedFinishPrice = price;
    selectedFinishName = name;
  });

  // Model Cards quick select
  const modelCardsButtons = document.querySelectorAll('.btn-model-select');
  modelCardsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modelId = btn.getAttribute('data-model-id');
      const modelBtns = document.querySelectorAll('#modelSelectGroup .btn-seg');
      if (modelId === 'cabin') modelBtns[0]?.click();
      else if (modelId === 'pavilion') modelBtns[1]?.click();
      else if (modelId === 'villa') modelBtns[2]?.click();

      const configEl = document.getElementById('configurator');
      if (configEl) {
        configEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Tour Modal
  const openTourModalBtn = document.getElementById('openTourModalBtn');
  const tourModal = document.getElementById('tourModal');
  const closeTourBtn = document.getElementById('closeTourBtn');

  if (openTourModalBtn && tourModal) {
    openTourModalBtn.addEventListener('click', () => {
      tourModal.classList.add('active');
    });
  }

  if (closeTourBtn && tourModal) {
    closeTourBtn.addEventListener('click', () => {
      tourModal.classList.remove('active');
    });
  }

  // Floor plan tabs
  const planTabs = document.querySelectorAll('.plan-tab');
  const schematic = document.getElementById('planSchematic');
  planTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      planTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const floor = tab.getAttribute('data-floor');
      if (floor === 'terrace') {
        schematic.innerHTML = `
          <div class="room" style="grid-column: span 2; grid-row: span 2; background: #e8eaed;">
            360° Open Air Rooftop Solar Deck & Hot Tub Observatory (85m²)
          </div>
        `;
      } else {
        schematic.innerHTML = `
          <div class="room room-living">Living Pavilion & Hearth (42m²)</div>
          <div class="room room-master">Master Sanctuary (26m²)</div>
          <div class="room room-sauna">Sauna & Cold Plunge (12m²)</div>
          <div class="room room-deck">Cantilevered Larch Deck (38m²)</div>
        `;
      }
    });
  });

  // Inquire form
  const inquireForm = document.getElementById('inquireForm');
  const inquireSuccess = document.getElementById('inquireSuccess');
  if (inquireForm) {
    inquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName').value;
      inquireSuccess.textContent = `Thank you, ${name}. Our lead architect has received your site brief. Expect a 3D topographic orientation within 48 hours.`;
      inquireForm.reset();
    });
  }

  // Reserve build slot button
  const reserveBuildBtn = document.getElementById('reserveBuildBtn');
  if (reserveBuildBtn) {
    reserveBuildBtn.addEventListener('click', () => {
      alert(`Fabrication slot reserved for ${selectedModelName}! Total estimate: ${totalPriceDisplay.textContent}. Our team will contact you for site survey.`);
    });
  }
});
