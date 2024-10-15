import "./navbar.scss";
import Image from "next/image";
import Link from "next/link";
import Search from "../searchField/search";
import { PiDetectiveFill } from "react-icons/pi";
import NavMob from "./navMob";
const Navbar = () => {
  return (
    <div className="navbar-parent">
      <div className="navbar-components">
        <div className="nav-head">
          <Link href="/">
            <Image src={"/logo.png"} width={106} height={102} />{" "}
          </Link>
          <div className="nav-head1">
            <Link href="/topic/world/1">
              <h1>fact check central</h1>
            </Link>
            <p>
              Read, search and fact-check stories and news from across the web
            </p>
          </div>
          <NavMob />
        </div>
      </div>
      <div className="nav-container">
        <ul className="nav-category">
          <Link href="/topic/technology/1">
            <li>Technology</li>
          </Link>
          <Link href="/topic/ai/1">
            {" "}
            <li>AI</li>
          </Link>
          <Link href="/topic/science/1">
            {" "}
            <li>Science</li>
          </Link>
          <Link href="/topic/lifestyle/1">
            {" "}
            <li>Lifestyle</li>
          </Link>
          <Link href="/topic/politics/1">
            {" "}
            <li>Politics</li>
          </Link>
          <Link href="/topic/sports/1">
            {" "}
            <li>Sports</li>
          </Link>
          <Link href="/topic/health/1">
            {" "}
            <li>Health</li>
          </Link>
          <Link href="/topic/entertainment/1">
            {" "}
            <li>Entertainment</li>
          </Link>
        </ul>
        <div className="nav-fact-search-user">
          <Link href="/fact-checker" target="_blank">
            Fact-Checker <PiDetectiveFill style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>
        <div className="nav-search">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
