/**
 * Konfigurasi Supabase Client & REST API untuk GitHub Pages
 * Project ID: ifhehmcmyaxipoysumsk
 */

const SUPABASE_URL = "https://ifhehmcmyaxipoysumsk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_VyfUwhMibgZ5LMJDoPROxw_LDdmga2T";

/**
 * Mengambil semua data buku dari Supabase
 */
async function fetchBooksFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/books?select=*&order=id.asc`, {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Gagal mengambil data buku dari Supabase:", error);
        return null;
    }
}

/**
 * Mengambil detail 1 buku berdasarkan ID
 */
async function fetchBookByIdFromSupabase(bookId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/books?id=eq.${bookId}&select=*`, {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const res = await response.json();
        return res[0] || null;
    } catch (error) {
        console.error("Gagal mengambil detail buku:", error);
        return null;
    }
}

/**
 * Menambahkan buku baru ke Supabase
 */
async function addBookToSupabase(bookData) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/books`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (error) {
        console.error("Gagal menambah buku:", error);
        throw error;
    }
}

/**
 * Update data buku di Supabase
 */
async function updateBookInSupabase(id, bookData) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/books?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (error) {
        console.error("Gagal mengupdate buku:", error);
        throw error;
    }
}

/**
 * Hapus buku dari Supabase
 */
async function deleteBookFromSupabase(id) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/books?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
    } catch (error) {
        console.error("Gagal menghapus buku:", error);
        throw error;
    }
}

/* ============================================================
 * BAB-BAB BUKU (CHAPTERS) REST API FUNCTIONS
 * ============================================================ */

/**
 * Mengambil daftar bab berdasarkan book_id
 */
async function fetchChaptersByBookId(bookId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chapters?book_id=eq.${bookId}&select=*&order=chapter_number.asc`, {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Gagal mengambil bab dari Supabase:", error);
        return [];
    }
}

/**
 * Mengambil 1 bab spesifik berdasarkan chapter_id
 */
async function fetchChapterById(chapterId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chapters?id=eq.${chapterId}&select=*`, {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const res = await response.json();
        return res[0] || null;
    } catch (error) {
        console.error("Gagal mengambil detail bab:", error);
        return null;
    }
}

/**
 * Menambahkan Bab Baru Ke Supabase
 */
async function addChapterToSupabase(chapterData) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chapters`, {
            method: 'POST',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            body: JSON.stringify(chapterData)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (error) {
        console.error("Gagal menambah bab:", error);
        throw error;
    }
}

/**
 * Update Bab di Supabase
 */
async function updateChapterInSupabase(chapterId, chapterData) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chapters?id=eq.${chapterId}`, {
            method: 'PATCH',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            body: JSON.stringify(chapterData)
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (error) {
        console.error("Gagal mengupdate bab:", error);
        throw error;
    }
}

/**
 * Hapus Bab dari Supabase
 */
async function deleteChapterFromSupabase(chapterId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/chapters?id=eq.${chapterId}`, {
            method: 'DELETE',
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (!response.ok) throw new Error(await response.text());
        return true;
    } catch (error) {
        console.error("Gagal menghapus bab:", error);
        throw error;
    }
}
