import "./MyInput.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyInput({ setOpenInput, maxWidth760 }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  function onSubmit() {
    localStorage.setItem("inputValue", inputValue);
    navigate("/catalog");
  }

  function closeInput() {
    setOpenInput(false);
    localStorage.clear();
  }

  return (
    <div className="my-input">
      <div className="my-input__container">
        <div className="input__input-group">
          <input
            className="input__input"
            placeholder="Поиск по названию или артикулу"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {!maxWidth760 && (
            <button
              className="input__input-button"
              onClick={() => {
                setInputValue("");
              }}
            ></button>
          )}
        </div>
        {!maxWidth760 ? (
          <button className="input__submit" onClick={onSubmit}>
            Найти
          </button>
        ) : (
          <button className="input__submit" onClick={onSubmit}></button>
        )}
        <button className="input__close" onClick={closeInput}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default MyInput;
