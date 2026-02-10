import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faReddit, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return <div className="bg-stone-950 py-8">
    <div className="container mx-auto px-2 flex justify-between md:flex-row flex-col md:gap-0 gap-2">
      <p className="text-white text-base/loose">
        &copy; Copyight by <span className="font-bold">SMK Letris Indonesia2</span> 2026
      </p>

      <div className="flex items-center md:gap-4 gap-1">
        <p className="text-white text-base/loose">Social Media</p>
        <span className="text-white">-</span>
        <a href="">
          <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl hover:text-indigo-900" />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl hover:text-indigo-900" />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faReddit} className="text-white text-2xl hover:text-indigo-900" />
        </a>
        <a href="https://www.youtube.com/">
          <FontAwesomeIcon icon={faYoutube} className="text-white text-2xl hover:text-indigo-900" />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl hover:text-indigo-900" />
        </a>
      </div>

    </div>
  </div>
};

export default Footer;