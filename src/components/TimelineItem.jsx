import React from "react";
export default function TimelineItem(props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { title, company, link, description, highlights, startDate, endDate } =
    props;
  const numElements = 2;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Present";
  const startDateFormated = formatDate(startDate);
  const endDateFormated = formatDate(endDate);
  const dateRange = `${startDateFormated} - ${endDateFormated}`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 bg-slate-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-slate-900 dark:bg-slate-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-slate-500 dark:text-slate-400">
        {dateRange}
      </time>
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        {title}
        {link && company && (
          <>
            {""} @ {""}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700 dark:text-slate-400 dark:hover:text-white"
            >
              {company}
            </a>
          </>
        )}
      </h2>
      {description && (
        <p className="mb-4 text-sm font-normal text-slate-500">{description}</p>
      )}
      {highlights && (
        <>
          <ol
            id="highlight-list"
            className="list-none list-inside pt-2 mb-2 text-sm font-normal text-slate-500 dark:text-slate-400"
          >
            {highlights
              .slice(0, isExpanded ? highlights.length : numElements)
              .map((highlight) => (
                <li
                  key={`normal-${highlight}`}
                  className="mb-2 text-sm font-normal text-slate-500 dark:text-slate-400"
                >
                  - {highlight}
                </li>
              ))}
          </ol>
          {highlights.length > numElements && (
            <button
              id="toggle-button"
              className="toggle-button underline text-sm hover:text-blue-700 text-slate-600  dark:text-slate-400 dark:hover:text-white flex gap-1 items-center"
              onClick={toggleExpand}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Show more
            </button>
          )}
        </>
      )}
    </li>
  );
}
