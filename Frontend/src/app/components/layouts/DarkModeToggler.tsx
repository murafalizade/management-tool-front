import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../../styles/toggler.scss";

const DarkModeToggler = () => {
  const [theme, setTheme] = useState("");
  const [checked, setChecked] = useState(theme === "dark");

  useEffect(() => {
    // get theme from cookie
    const theme = localStorage.getItem("theme");
    // if theme is dark then toggle checked state
    if (theme === "dark") {
      setChecked(true);
    }
  }, []);

  const handleClick = () => {
    // set theme to local storage
    localStorage.setItem("theme", checked ? "ligth" : "dark");
    if (!checked) {
      document.body.classList.add("inverse");
    } else {
      document.body.classList.remove("inverse");
    } // toggle checked state
    setChecked(!checked);
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleClick}
          aria-label="Toggle Theme"
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default DarkModeToggler;
