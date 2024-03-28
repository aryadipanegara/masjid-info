import React, { useState } from "react";

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("email"));

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please sign in first."); // Alert user to sign in
      return;
    }
    // Add your comment adding logic here
    addComment(comment);
    setComment(""); // Clear the comment input field after submitting
  };

  return (
    <div>
      {!isLoggedIn && (
        <p className="text-red-500">Please sign in to leave a comment.</p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Write your comment here..."
          className="w-full p-2 mb-2 border rounded"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
