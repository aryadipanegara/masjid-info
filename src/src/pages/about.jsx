// Other imports...
import { FaGithub, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-hidden">
      <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/public/assets/hendra gunawan.jpeg"
              alt="Profile Picture 1"
              className="w-28 h-28 rounded-full"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Hendra Gunawan</h2>
          <p className="text-gray-600">Penulis</p>

          {/* Social Icons */}
          <div className="flex mt-4">
            <a
              href="https://github.com/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6 mr-4 text-gray-600 hover:text-black" />
            </a>
            <a
              href="https://instagram.com/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 mr-4 text-gray-600 hover:text-pink-500" />
            </a>
            <a
              href="https://tiktok.com/@username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="w-6 h-6 mr-4 text-gray-600 hover:text-black" />
            </a>
            <a
              href="https://linkedin.com/in/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-blue-500" />
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/public/assets/argun.jpg"
              alt="Profile Picture 2"
              className="w-28 h-28 rounded-full"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Arya Gunawan</h2>
          <p className="text-gray-600">Dev</p>

          {/* Social Icons */}
          <div className="flex mt-4">
            <a
              href="https://github.com/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6 mr-4 text-gray-600 hover:text-black" />
            </a>
            <a
              href="https://instagram.com/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 mr-4 text-gray-600 hover:text-pink-500" />
            </a>
            <a
              href="https://tiktok.com/@username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="w-6 h-6 mr-4 text-gray-600 hover:text-black" />
            </a>
            <a
              href="https://linkedin.com/in/username1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
