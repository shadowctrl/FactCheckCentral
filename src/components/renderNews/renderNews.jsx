import "./renderNews.scss";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const RenderNews = ({ thumbnail, title, desc, date, refLink }) => {
  return (
    <div className="newsRender-parent">
      <div className="news-container">
        <div className="newsRender-left">
          <Image
            src={thumbnail}
            width={138}
            height={11}
            className=" rounded-md"
          />
          <div>
            <Link href="https://twitter.com/senseaboutsci" target="_blank">
              <FaXTwitter className="text-3xl fill-yellow-400" />
            </Link>
            <Link
              href="https://www.facebook.com/senseaboutscience"
              target="_blank"
            >
              {" "}
              <FaFacebook className="text-3xl fill-yellow-400" />
            </Link>
          </div>
        </div>
        <div className="newsRender-right">
          <Link href={refLink} target="_blank">
            {" "}
            <h1>{title}</h1>
          </Link>
          <p>{desc}...</p>
          <Link href={refLink} target="_blank">
            <span>READ MORE</span>
          </Link>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default RenderNews;
