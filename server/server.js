import express from "express";
import masjidData from "./data.cjs";

const app = express();
const port = 3001;

app.use(express.json());

// Rute untuk mendapatkan semua data masjid
app.get("/masjid", (req, res) => {
  res.json(masjidData);
});

// Rute untuk mendapatkan satu data masjid berdasarkan ID
app.get("/masjid/:id", (req, res) => {
  const id = req.params.id;
  const masjid = masjidData.find((item) => item.id === id);

  if (masjid) {
    res.json(masjid);
  } else {
    res.status(404).json({ error: "Masjid not found" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
