 document.addEventListener('DOMContentLoaded', function () {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebarToggle');

      if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
          sidebar.classList.toggle('collapsed');
        });
      }

      // Smooth Anchor Scroll & Aktifkan Status Sub-navigasi
      const subnavLinks = document.querySelectorAll('.subnav-link');
      subnavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          
          if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            subnavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
          }
        });
      });
    });