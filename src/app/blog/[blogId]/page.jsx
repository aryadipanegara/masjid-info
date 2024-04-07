"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetailPage({ params: { blogId } }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/articles/${blogId}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-800">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600">Error: {error}</p>;
  }

  // Split sejarah menjadi paragraf berdasarkan "\r\n\r\n"
  const paragraphs = blog.sejarah.split(/\r\n\r\n/);

  let paragraphCount = 0;
  let photoIndex = 0;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-700 rounded-lg my-5">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500">
          {new Date(blog.tanggal).toLocaleDateString()}
        </p>
        <h1 className="text-3xl font-bold mb-2">{blog.nama}</h1>
        <p className="text-gray-900 font-semibold">
          <span>{blog.negara}</span>
        </p>
        <p className="text-gray-600"> {blog.lokasi}</p>
      </div>
      {paragraphs.map((paragraph, index) => {
        // Mengecek apakah paragraph kosong
        if (paragraph.trim() === "") return null;

        // Mengecek apakah paragraph diawali dan diakhiri dengan "*"
        const isBold =
          paragraph.trim().startsWith("*") && paragraph.trim().endsWith("*");

        // Membuat tag p untuk paragraph, jika bold maka menggunakan tag strong
        const ParagraphComponent = isBold ? "strong" : "p";

        // Menghitung jumlah paragraph
        paragraphCount++;

        // Menambahkan foto setiap 3 paragraph
        const shouldInsertPhoto =
          paragraphCount % 3 === 0 && photoIndex < blog.foto.length;

        return (
          <div key={index} className="mb-6">
            <ParagraphComponent className="text-lg mb-4">
              {paragraph}
            </ParagraphComponent>
            {shouldInsertPhoto && (
              <div className="mb-6">
                <img
                  src={blog.foto[photoIndex].url}
                  alt={blog.foto[photoIndex].keterangan}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2 textpce">
                  {blog.foto[photoIndex].keterangan}
                </p>
              </div>
            )}
            {shouldInsertPhoto && photoIndex++}
          </div>
        );
      })}
    </div>
  );
}
