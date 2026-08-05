// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll-reveal for elements with .reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => io.observe(el));
  // safety net: never leave content permanently invisible
  window.addEventListener('load', () => {
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 1500);
  });
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
// =========================================================================
// Farm Directory — Interactive filtering
// =========================================================================
document.addEventListener('DOMContentLoaded', function() {
  const farms = [
    {
      name: "Regional Farm of Maremma",
      location: "Maremma, Tuscany",
      tag: "Public · conservation",
      desc: "4,000 ha public farm with Maremma cattle & horses. Conservation of ancient breeds, butteri culture, self-sufficient forage, wolf-adapted herd behavior.",
      practices: ["Breed conservation", "Silvopastoral", "Organic", "Natural breeding"],
      filters: ["breed-conservation", "silvopastoral", "organic"]
    },
    {
      name: "Fattoria Latte Maremma",
      location: "Maremma, Tuscany",
      tag: "Dairy · small scale",
      desc: "28 dairy cows (Alpina), 39 ha. Closed-loop manure system, low water use (25 L/cow/day), agritourism provides >30% income.",
      practices: ["Organic", "Closed-loop", "Agritourism", "Artificial insemination"],
      filters: ["organic", "agritourism"]
    },
    {
      name: "Terra di Sacra",
      location: "Maremma, Tuscany",
      tag: "Private · WWF oasis",
      desc: "1,050 ha, 600 cultivated. Maremma cows, 3-year rotation (wheat, medicinal herbs). Saline intrusion, winter crops. Agritourism + landscape maintenance.",
      practices: ["Organic", "Breed conservation", "Agritourism", "Crop rotation"],
      filters: ["organic", "breed-conservation", "agritourism"]
    },
    {
      name: "San Carlo Rice Farm",
      location: "Maremma, Tuscany",
      tag: "Rice · organic transition",
      desc: "Rice in former marshland. Transitioned to organic: cover crops, green manure, no chemicals. 70% sold to wholesaler. Rice varieties: Carnaroli & smaller starch.",
      practices: ["Organic", "Green manure", "Crop rotation", "Water management"],
      filters: ["organic"]
    },
    {
      name: "Mugello Chestnut Farm",
      location: "Mugello, Tuscany",
      tag: "Chestnut PGI · ancient",
      desc: "800 m elevation, 100-150 yr old trees. Harvest by hand, PGI certification. Tourism main income. Invasive bug controlled via natural predator.",
      practices: ["Ancient varieties", "PGI", "Agritourism", "Natural pest control"],
      filters: ["ancient-grains", "agritourism"]
    },
    {
      name: "Castello di Verrazzano",
      location: "Chianti, Tuscany",
      tag: "High-end wine",
      desc: "50 ha, 250-500 m elevation. Schist/limestone soils, soft tilling, zeolite rock dust for leaf protection. Soil regeneration, 50% cover crop goal.",
      practices: ["Biodynamic", "Soil regeneration", "Cover crops", "Vermicompost"],
      filters: ["biodynamic"]
    },
    {
      name: "Fontodi",
      location: "Panzano, Chianti",
      tag: "Organic wine",
      desc: "100 ha. Copper + orange oil for fungus. Tilling with decompactor, olive trees between vineyards. Monoculture cover crop. Chianina cattle for manure.",
      practices: ["Organic", "Copper reduction", "Manure composting", "Breed conservation"],
      filters: ["organic", "breed-conservation"]
    },
    {
      name: "Podere Ruggeri",
      location: "Tuscany",
      tag: "Silvopastoral · Calvana",
      desc: "10 ha + 70 rented. Calvana cattle, sheep, goats, Cinta Senese pigs. Diversified: meat, cheese, olive oil, agritourism. 40 Calvana cows, conservation breed.",
      practices: ["Silvopastoral", "Breed conservation", "Diversified", "Agritourism", "Organic"],
      filters: ["silvopastoral", "breed-conservation", "agritourism", "organic"]
    },
    {
      name: "Fattoria di Selvoli",
      location: "Casentino, Tuscany",
      tag: "Ancient wheat · seed saving",
      desc: "30 ha (closed 2m fence for wildlife). Ancient wheat, spelt, rye. No external seeds — saved population evolves. 60-80€/kg wheat, flour 200€/kg.",
      practices: ["Ancient grains", "Seed saving", "Green manure", "Short supply chain"],
      filters: ["ancient-grains"]
    },
    {
      name: "Virgona Farm (Salina)",
      location: "Salina, Aeolian Islands",
      tag: "Diversified · craft",
      desc: "7 ha, 200 small plots. Wine, capers, beer (using capers). Not organic due to plot fragmentation. Direct sales, international export.",
      practices: ["Diversified", "Direct sales", "Artisanal processing"],
      filters: []
    },
    {
      name: "La Macina (Lipari)",
      location: "Lipari, Aeolian Islands",
      tag: "Ancient grain · pasta",
      desc: "33 ha, ancient grain, olives, vines. Provides 80% fresh pasta for island restaurants. Restored mill, encourages other farmers to grow ancient grains.",
      practices: ["Ancient grains", "Mill on farm", "Short supply chain"],
      filters: ["ancient-grains"]
    },
    {
      name: "Le Fonti (Panzano)",
      location: "Panzano, Chianti",
      tag: "Organic pioneer",
      desc: "Trigger: flavescenza dorata. Collaborative monitoring instead of blanket spraying. Spevis agronomists, homeopathic remedies, shared info on peronospora.",
      practices: ["Organic", "Collaborative", "Monitoring", "Homeopathic"],
      filters: ["organic"]
    }
  ];

  const grid = document.getElementById('farmGrid');
  const filterBar = document.getElementById('filterBar');

  // If the farm section doesn't exist on this page, exit early
  if (!grid || !filterBar) return;

  function render(filter = 'all') {
    const filtered = filter === 'all' ? farms : farms.filter(f => f.filters.includes(filter));
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-farms">No farms match this filter. Try another category.</div>`;
      return;
    }
    grid.innerHTML = filtered.map(f => `
      <div class="farm-card">
        <div class="farm-name">
          ${f.name}
          <span class="farm-tag">${f.tag}</span>
        </div>
        <div class="farm-location">${f.location}</div>
        <div class="farm-desc">${f.desc}</div>
        <div class="farm-practices">
          ${f.practices.map(p => `<span class="practice-tag">${p}</span>`).join('')}
        </div>
        <div class="farm-meta">
          <span>📍 ${f.location.split(',').pop().trim()}</span>
          <span><i>${f.practices.length} practices</i></span>
        </div>
      </div>
    `).join('');
  }

  function setActiveFilter(filter) {
    // Update button states
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    // Render the filtered farms
    render(filter);
  }

  // Event listener for filter buttons
  filterBar.addEventListener('click', function(e) {
    const btn = e.target.closest('.filter-btn');
    if (btn) {
      const filter = btn.dataset.filter;
      setActiveFilter(filter);
    }
    // Handle reset button
    if (e.target.id === 'resetFilters' || e.target.closest('#resetFilters')) {
      setActiveFilter('all');
    }
  });

  // Initial render
  render('all');
});
