const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.cjs");
const ApiResponse = require("./response.cjs");

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data masjid
app.get("/api/masjid", (req, res) => {
  const query = `
    SELECT
      m.id,
      m.nama_masjid,
      m.lokasi,
      m.negara,
      m.tanggal_dibuat,
      s.bagian,
      s.detail,
      f.foto,
      f.url
    FROM masjid m
    LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
    LEFT JOIN foto_masjid f ON m.id = f.masjid_id;
  `;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json(ApiResponse.error("Gagal mengambil data masjid"));
      return;
    }

    // Mengonversi hasil query ke dalam struktur JSON yang diinginkan
    const formattedResult = {
      data: result.reduce((acc, row) => {
        // Cek apakah masjid sudah ada di hasil atau belum
        const masjidIndex = acc.findIndex((m) => m.id === row.id);

        // Jika belum, tambahkan masjid baru
        if (masjidIndex === -1) {
          acc.push({
            id: row.id,
            nama_masjid: row.nama_masjid,
            lokasi: row.lokasi,
            negara: row.negara,
            tanggal_dibuat: row.tanggal_dibuat,
            sejarah: {
              [row.bagian]: row.detail,
            },
            foto_masjid: {
              [row.foto]: row.url,
            },
          });
        } else {
          // Jika sudah ada, tambahkan bagian sejarah dan foto_masjid
          acc[masjidIndex].sejarah[row.bagian] = row.detail;
          acc[masjidIndex].foto_masjid[row.foto] = row.url;
        }

        return acc;
      }, []),
    };

    res
      .status(200)
      .json(
        ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
      );
  });
});

app.get("/api/masjid/:id", (req, res) => {
  const masjidId = req.params.id;

  // Cek apakah ID yang diberikan adalah angka
  if (isNaN(masjidId)) {
    res.status(400).json(ApiResponse.error("ID masjid harus berupa angka"));
    return;
  }

  const query = `
    SELECT
      m.id,
      m.nama_masjid,
      m.lokasi,
      m.negara,
      m.tanggal_dibuat,
      s.bagian,
      s.detail,
      f.foto,
      f.url
    FROM masjid m
    LEFT JOIN sejarah_masjid s ON m.id = s.masjid_id
    LEFT JOIN foto_masjid f ON m.id = f.masjid_id
    WHERE m.id = ?;
  `;

  db.query(query, [masjidId], (err, result) => {
    if (err) {
      res.status(500).json(ApiResponse.error("Gagal mengambil data masjid"));
      return;
    }

    if (result.length === 0) {
      res.status(404).json(ApiResponse.error("Masjid tidak ditemukan"));
      return;
    }

    // Mengonversi hasil query ke dalam struktur JSON yang diinginkan
    const formattedResult = {
      data: result.reduce((acc, row) => {
        acc.id = row.id;
        acc.nama_masjid = row.nama_masjid;
        acc.lokasi = row.lokasi;
        acc.negara = row.negara;
        acc.tanggal_dibuat = row.tanggal_dibuat;

        // Cek apakah sejarah sudah ada di hasil atau belum
        if (!acc.sejarah) {
          acc.sejarah = {};
        }

        acc.sejarah[row.bagian] = row.detail;

        // Cek apakah foto_masjid sudah ada di hasil atau belum
        if (!acc.foto_masjid) {
          acc.foto_masjid = {};
        }

        acc.foto_masjid[row.foto] = row.url;

        return acc;
      }, {}),
    };

    res
      .status(200)
      .json(
        ApiResponse.success(formattedResult, "Data masjid berhasil diambil")
      );
  });
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
