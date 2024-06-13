import { Link } from "react-router-dom";
import Layout from "../../componentes/layout/Layout";
import Advert from "./components/Advert";
import styles from "./AdvertsList.module.css";
import { getAdverts } from "./service";
import { useEffect, useState } from "react";
import RadioButton from "../../componentes/shared/RadioButton";
import { useNavigate } from "react-router-dom";
import NotificationMSG from "../../componentes/shared/Notification";
import FormField from "../../componentes/shared/FormField";

export function AdvertsList() {
  const navigate = useNavigate();

  const [adverts, setAdverts] = useState([]);

  const [adsFilter, setAdsFilter] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");

  const [PricesFilter, setPricesFilter] = useState({
    minprice: "",
    maxprice: "",
  });

  const { minprice, maxprice } = PricesFilter;

  const handleChange = (event) => {
    setPricesFilter((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const getFilterAdverts = () => {
    const ads = [...adverts];

    let sale = true || false;
    if (typeFilter === "sell") {
      sale = true;
    } else if (typeFilter === "buy") {
      sale = false;
    }

    setAdsFilter(
      ads.filter(
        (ad) =>
          ad.sale === sale &&
          ad.price >= (minprice === "" ? ad.price : minprice) &&
          ad.price <= (maxprice === "" ? ad.price : maxprice)
      )
    );
    setIsFilter(true);
  };

  const resetFilters = () => {
    setPricesFilter({
      ["maxprice"]: "",
      ["minprice"]: "",
    });
    setTypeFilter("");
    setAdsFilter(adverts);
    setIsFilter(false);
  };

  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    try {
      getAdverts().then((ads) => {
        setAdverts(ads);
        setAdsFilter(ads);
      });
    } catch (error) {
      if (error.status === 404) navigate("/404");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className={styles.filterContainer}>
        {!isFilter && (
          <div>
            <div className={styles.typeFilterContainer}>
              <RadioButton
                className="filerByType"
                title="Filter by type"
                name="sale"
                arrayInput={[
                  {
                    label: "All",
                    id: "all",
                    value: `${typeFilter}`,
                    onChange: () => setTypeFilter("all"),
                    checked: typeFilter === "all",
                  },
                  {
                    label: "To Sell",
                    id: "sell",
                    value: `${typeFilter}`,
                    onChange: () => setTypeFilter("sell"),
                    checked: typeFilter === "sell",
                  },
                  {
                    label: "To Buy",
                    id: "buy",
                    value: `${typeFilter}`,
                    onChange: () => setTypeFilter("buy"),
                    checked: typeFilter === "buy",
                  },
                ]}
              />
            </div>
            <div className={styles.priceFilterContainer}>
              <FormField
                type="number"
                name="minprice"
                label="Min price"
                className="filterPrice"
                value={minprice}
                onChange={handleChange}
                step="0.01"
              />
              <FormField
                type="number"
                name="maxprice"
                label="Max price"
                className="filterPrice"
                value={maxprice}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </div>
        )}
        {isFilter && (
          <div>
            <h3>Filter by: </h3>
            <p>
              Type:{" "}
              {typeFilter === "" ? "No filter" : `To ${typeFilter} adverts`}
            </p>
            <h3>Price:</h3>
            <p>
              Min price = {minprice === "" ? "No filter" : `${minprice} EUR`}
            </p>
            <p>
              Max price = {maxprice === "" ? "No filter" : `${maxprice} EUR`}
            </p>
          </div>
        )}
        <button
          className={styles.filterButton}
          disabled={
            isFilter ||
            (minprice === "" && maxprice === "" && typeFilter === "")
          }
          onClick={getFilterAdverts}
        >
          Filter
        </button>
        <button
          className={styles.filterButton}
          disabled={!isFilter}
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
      <ul className={styles.advertsList}>
        {adsFilter.length !== 0 ? (
          adsFilter.map(({ ...advert }) => (
            <li className={styles.advertContainer} key={advert.id}>
              <Link to={`/adverts/${advert.id}`}>
                <Advert {...advert} />
              </Link>
            </li>
          ))
        ) : (
          <NotificationMSG
            className={styles.emptyAdvertsList}
            msg="No ads to show yet"
          />
        )}
      </ul>
    </Layout>
  );
}
