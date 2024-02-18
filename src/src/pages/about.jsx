import { FaGithub, FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mx-auto pt-2">
      <div className=" bg-whitem-4 p-4 rounded shadow-md">
        <p className="text-2xl font-bold mb-4">Assalamualaikum wr.wb</p>
        <p className="mb-4">
          Masjidinfo adalah pengalihan dari bujangmasjid.blogspot.com yang
          didedikasikan sebagai gudang informasi masjid di Indonesia dan dunia.
          Beberapa masjid pernah kami kunjungi langsung, sebagian lainnya
          dikompilasi dari berbagai sumber media, termasuk internet, penerbitan,
          dan sebagainya, sebagai kontribusi kami dalam dakwah Islam.
        </p>
        <p className="mb-4">
          Diperbolehkan menyalin atau menyebarkan informasi ini untuk
          kepentingan dakwah Islam, bukan untuk bisnis. Mohon patuhi etika dan
          tata krama dengan mencantumkan sumber dari blog ini.
        </p>
        <p className="mb-4">
          Semoga kita diberikan kesempatan mewujudkan mimpi untuk datang ke
          Masjidil Haram dan Masjid Nabawi di Madinah, serta menjalankan ibadah
          Umroh & Haji bersama orang-orang tercinta. Dan juga mendapat
          kesempatan untuk mengunjungi kiblat pertama, Masjidil Aqso di
          Palestina. Ketika saat itu tiba, semoga Palestina sudah kembali ke
          pangkuan Islam.
        </p>
        <p className="mb-4">
          <strong>Kontribusi:</strong> Anda dapat menyumbangkan naskah tulisan
          menarik tentang masjid dan dunia Islam, dilengkapi dengan foto menarik
          dan sumber-sumber terpercaya. Jika cukup menarik, kami akan memuatnya
          dengan mencantumkan nama Anda sebagai penulis atau narasumber. Naskah
          dapat dikirimkan melalui email ke bujanglanang@gmail.com.
        </p>
        <p className="mb-4">
          Anda juga dapat berkontribusi aktif untuk menjaga kelangsungan domain
          masjidinfo.net dengan melakukan scan barcode terlampir.
        </p>
        <p className="mb-4">
          Ikuti kami di Instagram <strong>@masjidinfo</strong> &{" "}
          <strong>@masjidinfo.id</strong>.
        </p>
        <p className="mb-4">Jazakallah Khairan Katsiran</p>
        <p>Wassalamualaikum wr.wb</p>
      </div>

      {/* Tim Card */}
      <div className="flex justify-center items-center mt-8">
        <div className="flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/assets/hendra gunawan.jpeg"
                alt="Profile Picture 1"
                className="w-32 h-32 rounded-full"
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
                src="/assets/argun.jpg"
                alt="Profile Picture 2"
                className="w-32 h-32 rounded-full"
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
    </div>
  );
};

export default About;
