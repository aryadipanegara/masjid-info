import { FaBookmark } from 'react-icons/fa';

const Bookmarks = ({ isBookmarked }) => {
  const bookmarkColor = isBookmarked ? 'black' : 'grey';

  return (
    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      <FaBookmark size={20} color={bookmarkColor} />
    </div>
  );
}

export default Bookmarks;
