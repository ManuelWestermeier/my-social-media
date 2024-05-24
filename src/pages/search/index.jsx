import { useSearchParams } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import getRequestUrl from "../../utils/get-request-url";
import UserProfileVideoList from "../../comp/user-profile-video-list";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const [results, setResults] = useState(false);

  return (
    <div className="p10">
      <center>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await fetch(
                getRequestUrl("/search", { search: searchParams.get("q") })
              );
              if (!res.ok) {
                alert("error : cant search");
              }

              setResults(await res.json());
            } catch (error) {
              alert("error : cant search");
            }
          }}
          className="search-form"
        >
          <input
            type="text"
            onInput={(e) =>
              setSearchParams((old) => ({ q: e.target.value }), {
                replace: true,
              })
            }
            value={searchParams.get("q")}
            placeholder="Search..."
            onMouseOver={(e) => e.target.focus()}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </form>
      </center>
      {results && (
        <div className="results">
          {results.length == 0 && <p>No Results</p>}
          <UserProfileVideoList videos={results} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
