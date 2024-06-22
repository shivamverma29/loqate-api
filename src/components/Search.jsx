import React, { useState, useEffect } from "react";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setItems([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const apiKey = "";
      const url = `https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=${apiKey}&Text=${searchTerm}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        const fetchedItems = data.Items.map(
          (item) => item.Description + item.Text
        );
        setItems(fetchedItems);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchData, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen flex mt-32 ml-40 min-w-96">
      <div className="abc">
        <h1>Search</h1>
        <div className="absolute mt-2 ml-auto mr-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
          <input
            id="search-input"
            className="block w-full px-4 py-2 text-white border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search items"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          {loading && <p className="px-4 py-2 text-gray-700">Loading...</p>}
          {error && (
            <p className="px-4 py-2 text-red-500">Error: {error.message}</p>
          )}
          {items.length > 0 &&
            items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {item}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
