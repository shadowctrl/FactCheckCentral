"use client";
import { MdOutlineMenu } from "react-icons/md";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "../searchField/search";
import { PiDetectiveFill } from "react-icons/pi";
import { MdMenuOpen } from "react-icons/md";

const NavMob = () => {
  const navRef = useRef(null);

  const handleClick = () => {
    const element = navRef.current;
    const body = document.body;
    element.classList.toggle("default-nav-mob");
    element.classList.toggle("slide-nav-mob");
    body.classList.toggle("no-scroll");
  };

  const handleOutsideClick = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      const element = navRef.current;
      const body = document.body;
      element.classList.add("default-nav-mob");
      element.classList.remove("slide-nav-mob");
      body.classList.remove("no-scroll");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="nav-menu-mob">
      <MdOutlineMenu className="menu-icon-mob" onClick={() => handleClick()} />

      <div
        ref={navRef}
        id="nav-handle"
        className="nav-container-mob default-nav-mob"
      >
        <MdMenuOpen
          className="menu-icon-close-mob"
          onClick={() => handleClick()}
        />
        <Search />
        <ul className="nav-category-mob">
          <Link href="/news/technology/1">
            <li>Technology</li>
          </Link>
          <Link href="/news/ai/1">
            <li>AI</li>
          </Link>
          <Link href="/news/science/1">
            <li>Science</li>
          </Link>
          <Link href="/news/lifestyle/1">
            <li>Lifestyle</li>
          </Link>
          <Link href="/news/politics/1">
            <li>Politics</li>
          </Link>
          <Link href="/news/sports/1">
            <li>Sports</li>
          </Link>
        </ul>
        <div className="nav-fact-search-user">
          <Link href="/factCheck" target="_blank">
            Fact-Checker <PiDetectiveFill style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavMob;
