import "./ElementPage.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import MyInput from "../Catalog/MyInput/MyInput";
import RepairKitComplect from "./RepairKitComplect/RepairKitComplect";
import { BASE_URL } from "../../constants/constants";

function ElementPage({ maxWidth760 }) {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [repairKit, setRepairKit] = useState();
  const [element, setElement] = useState();
  const [openInput, setOpenInput] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getElement();
  }, []);

  const handleMainPhoto = () => {
    if (allImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % allImages.length;
      setCurrentImageIndex(nextIndex);
      setMainImage(allImages[nextIndex]);
    }
  };

  useEffect(() => {
    if (element) {
      setMainImage(element.images[0].image);
    }
  }, [element]);

  useEffect(() => {
    if (element && maxWidth760) {
      const images = element?.images?.map((img) => img.image) || [];
      const sparePartImages =
        element?.parts?.map((part) => part.spare_part?.main_image) || [];
      const validImages = images.filter((img) => img !== undefined);
      const validSparePartImages = sparePartImages.filter(
        (img) => img !== undefined,
      );
      const combinedImages = validImages.concat(validSparePartImages);
      setAllImages(combinedImages);
      setMainImage(combinedImages[0]);
    }
  }, [element, maxWidth760]);

  useEffect(() => {
    if (type == "repair_kit") {
      setRepairKit(true);
    } else if (type == "spare_part") {
      setRepairKit(false);
    } else {
      setRepairKit(true);
    }
  }, [type]);

  function getElement() {
    fetch(`${BASE_URL}/catalog/${type}/${id}/`)
      .then((res) => res.json())
      .then((resData) => {
        const fetchedData = JSON.parse(JSON.stringify(resData));
        setElement(fetchedData);
      })
      .catch((res) => {
        if (res.status == 500) {
          navigate("./error");
        } else {
          console.log("Ошибка при получении данных:", res.message);
        }
      });
  }

  function handleEngineFilter() {
    const id = element.engine_cat.id;
    const name = element.engine_cat.name;
    localStorage.setItem("engineSort", id);
    localStorage.setItem("engineName", name);
    navigate("/catalog");
  }

  function handleRepKitFilter() {
    handleEngineFilter();
    const id = element.engine_cat.id;
    localStorage.setItem("engineKitSort", id);
  }

  function handleMapFilter() {
    const id = element.engine_cat.id;
    const name = element.engine_cat.name;
    localStorage.setItem("engineMapSort", id);
    localStorage.setItem("engineMapName", name);
    navigate("/");
  }


  if (!element) return;

  console.log(element)

  return (
    <>
      <Header
        maxWidth760={maxWidth760}
        setBurgerMenuOpen={setBurgerMenuOpen}
        showTitle={false}
        catalog={true}
      />
      <main className="element">
        <div className="element__header">
          <div className="element__road">
            <button
              className="element__road-back"
              onClick={() => navigate(-1)}
            ></button>
            <Link className="element__link" to={`/catalog`}>
              Каталог продукции /
            </Link>
            <a
              href="/catalog"
              className="element__link"
              onClick={handleEngineFilter}
            >
              {" "}
              {element.engine_cat.name} /{" "}
            </a>
            {repairKit && (
              <a
                href="/catalog"
                className="element__link"
                onClick={handleRepKitFilter}
              >
                Ремкомплекты /{" "}
              </a>
            )}
            <p className="element__road-name">{element.name}</p>
          </div>

          {!openInput ? (
            <button
              className="element__search-button"
              onClick={() => setOpenInput(!openInput)}
            ></button>
          ) : (
            <button
              className="element__search-button element__search-button_close"
              onClick={() => setOpenInput(!openInput)}
            ></button>
          )}
        </div>
        <div className="element__main">
          <div className="element__photo">
            <img className="element__photo-main" src={mainImage} />
            {maxWidth760 && mainImage && (
              <button className="element__photo-next" onClick={handleMainPhoto}>
                &gt;
              </button>
            )}
            {!maxWidth760 && (
              <ul className="element__photo-list">
                {element.images.length > 1 &&
                  element.images.map((image) => (
                    <img
                      className={mainImage!=image.image ? "element__photo-item": "element__photo-item element__photo-item_active"}
                      src={image.image}
                      key={uuidv4()}
                      onClick={() => {
                        setMainImage(image.image);
                      }}
                    />
                  ))}
                {repairKit &&
                  element.parts.map((item) => (
                    <img
                    className={mainImage!=item.spare_part.main_image ? "element__photo-item": "element__photo-item element__photo-item_active"}
                      src={item.spare_part.main_image}
                      key={uuidv4()}
                      onClick={() => {
                        setMainImage(item.spare_part.main_image);
                      }}
                    />
                  ))}
              </ul>
            )}
          </div>
          <div className="element__info">
            <h2 className="element__title">{element.name}</h2>
            <h4 className="element__subtitle">АРТИКУЛ:</h4>
            <div className="element__article">
              <p className="element__description">{element.article}</p>
              <CopyToClipboard text={element.article}>
                <button className="catalog-item__articke-copy"></button>
              </CopyToClipboard>
            </div>
            <button className="element__map-button" onClick={handleMapFilter}>
              Где купить
            </button>
            {!repairKit ? (
              <>
                {element.materials.length != 0 && (
                  <>
                    <h4 className="element__subtitle">МАТЕРИАЛ:</h4>
                    {element.materials.map((item) => (
                      <p className="element__description" key={item.name}>
                        {item.name}
                      </p>
                    ))}
                  </>
                )}
                {element.special_feature && (
                  <>
                    <h4 className="element__subtitle">ОСОБЫЕ СВОЙСТВА:</h4>
                    <p className="element__description">
                      {element.special_feature}
                    </p>
                  </>
                )}
                {element.material_properties && (
                  <>
                    <h4 className="element__subtitle">СВОЙСТВА МАТЕРИАЛА:</h4>
                    <p className="element__description">
                      {element.material_properties}
                    </p>
                  </>
                )}
              </>
            ) : (
              <RepairKitComplect element={element} />
            )}
          </div>
        </div>
      </main>
      <Footer />
      {burgerMenuOpen && (
        <BurgerMenu setBurgerMenuOpen={setBurgerMenuOpen} catalog={true} />
      )}
      {openInput && (
        <MyInput maxWidth760={maxWidth760} setOpenInput={setOpenInput} />
      )}
    </>
  );
}

export default ElementPage;
