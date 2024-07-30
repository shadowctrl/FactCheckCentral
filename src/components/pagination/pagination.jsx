"use client";
import { useEffect } from "react";
import "./pagination.scss";
import { useRouter } from "next/navigation";

const Pagination = ({ category, maxPage }) => {
  const router = useRouter();
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
  }, []);

  const numbers = [];
  for (let i = 1; i <= maxPage; i++) {
    numbers.push(i);
  }
  return (
    <div className="pagination-parent">
      {numbers.map((value, index) => (
        <div key={`page` + index} className="page-container">
          <button onClick={() => router.push(`/news/${category}/${value}`)}>
            {value}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
