import "./RepairKitComplect.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function RepairKitComplect({ element }) {
  return (
    <>
      <h4 className="element__subtitle">КОМПЛЕКТАЦИЯ:</h4>
      {element.parts.map((item) => (
        <div className="repair-kit" key={uuidv4()}>
          <a
            className="repair-kit__item"
            href={`/catalog/spare_part/${item.spare_part.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.spare_part.name}
          </a>
          {item.quantity && (
            <p className="repair-kit__description">
              Количество: {item.quantity}шт
            </p>
          )}
          {item.spare_part.article && (
            <p className="repair-kit__description">
              Артикул: {item.spare_part.article}
            </p>
          )}
          {item.spare_part.materials.length != 0 && (
            <p className="repair-kit__description">
              Материал:{" "}
              {item.spare_part.materials
                .map((material) => material.name)
                .join(", ")}
            </p>
          )}
          {item.special_feature && (
            <p className="repair-kit__description">
              Особые свойста: {item.special_feature}
            </p>
          )}
          {item.material_properties && (
            <p className="repair-kit__description">
              Свойства материала: {item.material_properties}
            </p>
          )}
        </div>
      ))}
    </>
  );
}

export default RepairKitComplect;
