document.addEventListener("DOMContentLoaded", function () {
    const openFilterBtn = document.getElementById("openFilterBtn");
    const saveFiltersBtn = document.getElementById("saveFiltersBtn");
    const resetFiltersBtn = document.getElementById("resetFiltersBtn");
    const filterModal = new bootstrap.Modal(document.getElementById("filterModal"));
    const selectedFiltersList = document.getElementById("selectedFiltersList");
  
    loadSavedFilters();
  
    openFilterBtn.onclick = () => {
      filterModal.show();
    };
  
    saveFiltersBtn.onclick = () => {
      saveFilters();
      filterModal.hide();
    };
  
    resetFiltersBtn.onclick = () => {
      resetFilters();
    };
  
    function saveFilters() {
      const filters = [];
      document.querySelectorAll("#filterForm .form-check-input").forEach(input => {
        if (input.checked) {
          filters.push(input.nextElementSibling.textContent.trim());
        }
      });
  
      localStorage.setItem("selectedFilters", JSON.stringify(filters));
      displayFilters(filters);
    }
  
    function loadSavedFilters() {
      const savedFilters = JSON.parse(localStorage.getItem("selectedFilters")) || [];
      document.querySelectorAll("#filterForm .form-check-input").forEach(input => {
        input.checked = savedFilters.includes(input.nextElementSibling.textContent.trim());
      });
  
      displayFilters(savedFilters);
    }
  
    function resetFilters() {
      document.querySelectorAll("#filterForm .form-check-input").forEach(input => {
        input.checked = false;
      });
      localStorage.removeItem("selectedFilters");
      displayFilters([]);
    }
  
    function displayFilters(filters) {
      selectedFiltersList.innerHTML = "";
      if (filters.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "list-group-item text-muted";
        emptyItem.textContent = "Фільтри не вибрані.";
        selectedFiltersList.appendChild(emptyItem);
      } else {
        filters.forEach(filter => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = filter;
          selectedFiltersList.appendChild(listItem);
        });
      }
    }
  });
  