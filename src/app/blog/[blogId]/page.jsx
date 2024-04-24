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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <p className="text-center mt-8 text-gray-800 animate-pulse">
        Sedang Memuat...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-8 text-red-600">
        Terjadi Kesalahan: {error}
      </p>
    );
  }

  if (!blog) {
    return (
      <p className="text-center mt-8 text-gray-800">Tidak ada data blog.</p>
    );
  }

  const paragraphs = blog.sejarah.split(/\r\n\r\n/);
  const totalPhotos = Math.min(paragraphs.length, blog.foto.length);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 shadow-lg rounded-lg my-5">
      <div className="text-center mb-6 ">
        <p className="text-sm text-gray-500">
          {new Date(blog.tanggal).toLocaleDateString()}
        </p>
        <h1 className="text-4xl font-bold mb-2 text-blue-800">{blog.nama}</h1>
        <p className="text-gray-900 font-semibold">{blog.negara}</p>
        <p className="text-gray-600 italic">{blog.lokasi}</p>
      </div>
      {paragraphs.map((paragraph, index) => {
        if (!paragraph.trim()) return null;
        const shouldDisplayPhoto = index < totalPhotos;
        const isBold =
          paragraph.trim().startsWith("*") && paragraph.trim().endsWith("*");
        const ParagraphComponent = isBold ? "strong" : "p";

        return (
          <div key={index} className="mb-6">
            <ParagraphComponent className="text-lg mb-4 text-gray-800">
              {paragraph.replace(/^\*|\*$/g, "")}
            </ParagraphComponent>
            {shouldDisplayPhoto && (
              <>
                <img
                  src={blog.foto[index].url}
                  alt={blog.foto[index].keterangan}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {blog.foto[index].keterangan}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
