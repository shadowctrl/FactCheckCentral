"use client";
import "./pagination.scss";
import { useRouter } from "next/navigation";

const Pagination = ({ category, maxPage, page }) => {
  const router = useRouter();
  const numbers = [];
  for (let i = 1; i <= maxPage; i++) {
    numbers.push(i);
  }
  return (
    <div className="pagination-parent">
      {numbers.map((value, index) => (
        <div key={`page` + index} className="page-container">
          <button
            className={value == page ? "page-active" : ""}
            onClick={() => router.push(`/topic/${category}/${value}`)}
          >
            {value}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
