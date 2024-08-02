"use client";
import "./share.scss";
import { FiShare } from "react-icons/fi";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6"; // Updated icon
import { IoLink, IoMailUnread } from "react-icons/io5";

const Share = ({ title, message }) => {
  const shareText = `*Check out this amazing fact score on Fact Check Central!* 
  
  *${title}*
  
  ${message}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleShareViaEmail = () => {
    const emailSubject = "Check this out!";
    const emailBody = `${shareText} ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleShareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
  };
  const handleShareClick = () => {
    const shareContent = document.querySelector("#share-content");
    shareContent.classList.toggle("share-content-inactive");
    shareContent.classList.toggle("share-content-active"); // Correct class name
  };

  return (
    <div className="share-parent">
      <h3 className="share-head" onClick={handleShareClick}>
        Share <FiShare />
      </h3>
      <div id="share-content" className="share-content share-content-inactive">
        <IoLink
          onClick={handleCopy}
          className="cursor-pointer"
          title="Copy Link"
        />
        <IoMailUnread
          onClick={handleShareViaEmail}
          className="cursor-pointer"
          title="Share via Email"
        />
        <FaXTwitter
          onClick={handleShareOnTwitter}
          className="cursor-pointer"
          title="Share on X (Twitter)"
        />
        <FaWhatsapp
          onClick={handleShareOnWhatsApp}
          className="cursor-pointer"
          title="Share on WhatsApp"
        />
      </div>
    </div>
  );
};

export default Share;