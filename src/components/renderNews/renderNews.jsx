"use client";
import { useEffect, useState } from "react";
import "./renderNews.scss";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const RenderNews = ({ thumbnail, title, desc, date, refLink }) => {
  const [vote, setVote] = useState(null);
  const handleVote = (value) => {
    if (value == "up") {
      setVote("up");
      localStorage.setItem(title, "up");
    } else {
      setVote("down");
      localStorage.setItem(title, "down");
    }
  };
  const handleCancel = () => {
    setVote(null);
    localStorage.removeItem(title);
  };

  useEffect(() => {
    const storedVote = localStorage.getItem(title);
    if (storedVote) setVote(storedVote);
  }, [title]);

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
          <div>
            {!vote ? (
              <div>
                {" "}
                <FaThumbsUp
                  onClick={() => handleVote("up")}
                  className="vote-icon"
                />
                <FaThumbsDown
                  onClick={() => handleVote("down")}
                  className="vote-icon"
                />
              </div>
            ) : vote == "up" ? (
              <FaThumbsUp
                onClick={() => handleCancel()}
                className="vote-icon vote-icon-green"
              />
            ) : (
              <FaThumbsDown
                onClick={() => handleCancel()}
                className="vote-icon vote-icon-red"
              />
            )}
          </div>
        </div>
        <div className="newsRender-right">
          <Link href={refLink} target="_blank">
            {" "}
            <h1>{title}</h1>
          </Link>
          <p>{desc}...</p>
          <div className="flex justify-between">
            <Link href={refLink} target="_blank">
              <span>READ MORE</span>
            </Link>
            <Link href={`/factCheck/${title}`} target="_blank">
              {" "}
              <span className="fact-check cursor-pointer">
                Check Fact Score
              </span>
            </Link>
          </div>

          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default RenderNews;
