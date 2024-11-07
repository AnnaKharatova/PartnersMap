import "./CatalogItem.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CatalogItem({ item }) {
  const navigate = useNavigate();
  const photo = `https://stroymash-partners.ru${item.main_image}`;
  const [isCopied, setIsCopied] = useState(false);

  function handleMapFilter() {
    const value = item.engine_cat.id;
    const name = item.engine_cat.name;
    localStorage.setItem("engineMapSort", value);
    localStorage.setItem("engineMapName", name);
    navigate("/");
  }

  function onCopyText() {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  return (
    <div className="catalog-item">
      <div className="catalog__img-container">
        <img
          className="catalog-item__img"
          src={photo}
          alt="изображение детали"
        />
      </div>
      <Link
        className="catalog-item__title"
        to={
          item.type
            ? `/catalog/${item.type}/${item.id}`
            : `/catalog/repair_kit/${item.id}`
        }
      >
        {item.name}
      </Link>
      <div className="catalog-item__article">
        <p className="catalog-item__articke-p">{item.article}</p>
        <CopyToClipboard text={item.article} onCopy={onCopyText}>
          <button className="catalog-item__articke-copy"></button>
        </CopyToClipboard>
        {isCopied && <div className="catalog-item__copied">Скопировано</div>}
      </div>
      <button className="catalog-item__map-button" onClick={handleMapFilter}>
        Где купить
      </button>
    </div>
  );
}

export default CatalogItem;
