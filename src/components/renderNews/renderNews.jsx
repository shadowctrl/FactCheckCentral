"use client";
import { useEffect, useState } from "react";
import "./renderNews.scss";
import Image from "next/image";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const RenderNews = ({ thumbnail, title, desc, date, refLink }) => {
  const [vote, setVote] = useState(null);
  const [voteDetails, setVoteDetails] = useState(null); // Initialize as null to hide initially

  const handleVote = async (value) => {
    if (value === "up") {
      setVote("up");
      localStorage.setItem(title, "up");
      setVoteDetails((currentVote) =>
        currentVote === null ? 1 : currentVote + 1
      );

      await fetch("/api/voteAdd", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
    } else {
      setVote("down");
      localStorage.setItem(title, "down");
    }
  };

  useEffect(() => {
    const storedVote = localStorage.getItem(title);
    if (storedVote) setVote(storedVote);

    const fetchData = async () => {
      const response = await fetch("/api/getVote", {
        method: "POST",
        body: JSON.stringify({ title: title }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setVoteDetails(data.vote || null); // Set to null if no votes
      } else if (response.status === 404) {
        setVoteDetails(null);
      }
    };
    fetchData();
  }, [title]);

  return (
    <div className="newsRender-parent">
      <div className="news-container">
        <div className="newsRender-left">
          <Image src={thumbnail} width={138} height={11} />
          <div className="voteDetails-container">
            {!vote ? (
              <div>
                <FaThumbsUp
                  onClick={() => handleVote("up")}
                  className="vote-icon"
                />
                <FaThumbsDown
                  onClick={() => handleVote("down")}
                  className="vote-icon"
                />
              </div>
            ) : vote === "up" ? (
              <FaThumbsUp className="vote-icon-disabled vote-icon-green" />
            ) : (
              <FaThumbsDown className="vote-icon-disabled vote-icon-red" />
            )}
            {voteDetails !== null && (
              <div>
                <p className="vote-details">
                  {voteDetails} people found this helful.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="newsRender-right">
          <Link
            href={refLink}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <h1>{title}</h1>
          </Link>
          <p>{desc}...</p>
          <div className="flex justify-between">
            <Link
              href={refLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <span>READ MORE</span>
            </Link>
            <Link href={`/factCheck/${title}`} target="_blank">
              <span className="fact-check cursor-pointer">
                Fact-check this story
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
