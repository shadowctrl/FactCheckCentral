import "./navbar.scss";
import Image from "next/image";
import Link from "next/link";
import Search from "../searchField/search";

const Navbar = () => {
  return (
    <div className="navbar-parent">
      <div className="navbar-components">
        <div className="nav-head">
          <Link href="/">
            <Image src={"/logo.png"} width={106} height={102} />{" "}
          </Link>
          <div className="nav-head1">
            <Link href="/news/all/1">
              {" "}
              <h1>fact check central</h1>
            </Link>
            <p>
              Read, search and share fact checking blogs from across the web
            </p>
          </div>
        </div>
        <div className="nav-head-sub">
          <Image src={"/logo2.jpg"} width={110} height={65} />
        </div>
      </div>
      <div className="nav-container">
        <ul className="nav-category">
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
        </ul>
        <div className="nav-search">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
