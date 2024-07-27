import Link from "next/link";
import "./footer.scss";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = ({}) => {
  return (
    <div className="footer-parent">
      <div className="footer-components">
        <div className="footer-container-main">
          <div className="footer-container">
            <Image src={"/logo.png"} width={76} height={102} />
            <h1>fact check central</h1>
          </div>
          <div>
            <p>
              Read, Search and share fact checking blogs from across the web.{" "}
              <br />
              If you want to discuss the content of any blogs please contact the
              sites that they are from.
            </p>
          </div>
        </div>
        <div className="footer-links">
          <h2>Useful Links</h2>
          <div className="footer-links-container">
            <div>
              <Link href="/news/technology/1">
                <li>Technology</li>
              </Link>
              <Link href="/news/ai/1">
                {" "}
                <li>AI</li>
              </Link>
              <Link href="/news/science/1">
                {" "}
                <li>Science</li>
              </Link>
            </div>
            <div>
              <Link href="/news/lifestyle/1">
                {" "}
                <li>Lifestyle</li>
              </Link>
              <Link href="/news/politics/1">
                {" "}
                <li>Politics</li>
              </Link>
              <Link href="/news/sports/1">
                {" "}
                <li>Sports</li>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-contact">
          <h2>Reach Us via</h2>
          <div className="footer-icons-parent">
            <Link href="https://twitter.com/senseaboutsci" target="_blank">
              <FaXTwitter className="footer-icons" />
            </Link>
            <Link
              href="https://www.facebook.com/senseaboutscience"
              target="_blank"
            >
              <FaFacebook className="footer-icons" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
