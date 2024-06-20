import { Link } from "react-router-dom";
import Layout from "../../componentes/layout/Layout";
import Advert from "./components/Advert";
import styles from "./AdvertsList.module.css";
import { useEffect, useState } from "react";
import NotificationMSG from "../../componentes/shared/Notification";
import { useDispatch, useSelector } from "react-redux";
import { listedAdverts } from "../../store/selectors";
import { getListAdverts } from "../../store/actions";
import RadioButton from "../../componentes/shared/RadioButton";
import FormField from "../../componentes/shared/FormField";

export function AdvertsList() {
  const dispatch = useDispatch();
  const adverts = useSelector(listedAdverts);

  const [adsFilter, setAdsFilter] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
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

  useEffect(() => {
    dispatch(getListAdverts());
    setAdsFilter(adverts);
  }, [dispatch, adverts]);

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
      <div>
        <ul className={styles.advertsList}>
          {adsFilter.length ? (
            <ul>
              {adsFilter.map(({ id, ...adverts }) => (
                <li key={id}>
                  <Link to={`/tweets/${id}`}>
                    <Advert {...adverts} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <NotificationMSG
              className={styles.emptyAdvertsList}
              msg="No ads to show yet"
            />
          )}
        </ul>
      </div>
    </Layout>
  );
}
