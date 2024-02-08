import axios from "axios";

const baseURL = "https://65c376a039055e7482c0f3a2.mockapi.io/";

const api = axios.create({
  baseURL,
});

export const fetchMasjidData = async () => {
  try {
    const response = await api.get("/masjid");
    return response.data;
  } catch (error) {
    console.error("Error fetching masjid data:", error);
    throw error;
  }
};

export const updateMasjidData = async (id, newData) => {
  try {
    const response = await api.put(`/masjid/${id}`, newData);
    return response.data;
  } catch (error) {
    console.error(`Error updating masjid data with ID ${id}:`, error);
    throw error;
  }
};
