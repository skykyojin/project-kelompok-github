document.addEventListener('DOMContentLoaded', function () {
  // 1. Toggle Sidebar & Backdrop Overlay
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  // Tutup sidebar otomatis jika dibuka di layar HP
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.add('collapsed');
  }

  // Buat overlay penutup sidebar jika belum ada
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay && sidebar) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function () {
      sidebar.classList.add('collapsed');
      overlay.classList.remove('active');
    });
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('collapsed');
      if (overlay) {
        if (!sidebar.classList.contains('collapsed') && window.innerWidth <= 768) {
          overlay.classList.add('active');
        } else {
          overlay.classList.remove('active');
        }
      }
    });
  }


  // 2. Subnav links (Terbaru / Populer)
  const subnavLinks = document.querySelectorAll('.subnav-link');
  subnavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      subnavLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 3. Filter Genre Chip Click (Dinamis untuk semua kartu buku)
  document.addEventListener('click', function (e) {
    const chip = e.target.closest('.genre-chip');
    if (chip) {
      const selectedGenre = (chip.getAttribute('data-filter') || '').toLowerCase().trim();

      document.querySelectorAll('.genre-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      document.querySelectorAll('.book-card, .book-item').forEach(card => {
        const cardGenre = (card.getAttribute('data-genre') || '').toLowerCase().trim();
        const genreTag = (card.querySelector('.genre-tag')?.textContent || '').toLowerCase().trim();

        if (
          selectedGenre === 'all' || 
          selectedGenre === 'semua' || 
          cardGenre === selectedGenre || 
          genreTag === selectedGenre ||
          genreTag.includes(selectedGenre) ||
          cardGenre.includes(selectedGenre)
        ) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 4. Klik Tombol Favorit / Heart Button (Mencegah buka halaman detail saat ikon hati diklik)
    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      e.preventDefault();
      e.stopPropagation();

      const isSolid = likeBtn.classList.contains('fa-solid');
      if (isSolid) {
        likeBtn.classList.remove('fa-solid', 'active');
        likeBtn.classList.add('fa-regular');
      } else {
        likeBtn.classList.remove('fa-regular');
        likeBtn.classList.add('fa-solid', 'active');
      }

      // Animasi feedback
      likeBtn.style.transform = 'scale(1.4)';
      setTimeout(() => {
        likeBtn.style.transform = '';
      }, 200);
    }
  });

  // 5. Search Bar Filter Realtime
  const searchInputs = document.querySelectorAll('.search-box input');
  searchInputs.forEach(input => {
    input.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();

      document.querySelectorAll('.book-card, .book-item').forEach(card => {
        const titleEl = card.querySelector('.book-title');
        const authorEl = card.querySelector('.book-author');
        if (!titleEl) return;

        const title = titleEl.textContent.toLowerCase();
        const author = authorEl ? authorEl.textContent.toLowerCase() : '';
        const genreEl = card.querySelector('.genre-tag');
        const genre = genreEl ? genreEl.textContent.toLowerCase() : '';
        const cardGenre = (card.getAttribute('data-genre') || '').toLowerCase();

        const match = title.includes(query) || author.includes(query) || genre.includes(query) || cardGenre.includes(query);
        card.style.display = match ? 'block' : 'none';
      });
    });
  });
});