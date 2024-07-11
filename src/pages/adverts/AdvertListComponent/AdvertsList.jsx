import Filters from "./Filters";
import { useAdverts } from "./useAdverts";
import { Link } from "react-router-dom";
import Layout from "../../../componentes/layout/Layout";
import Advert from "../components/Advert";
import styles from "./AdvertsList.module.css";
import NotificationMSG from "../../../componentes/shared/Notification";

export default function AdvertsList() {
  const {
    adsFilter,
    typeFilter,
    PricesFilter,
    isFilter,
    handleChange,
    getFilterAdverts,
    resetFilters,
    setTypeFilter,
    arrayTags,
  } = useAdverts();

  const { minprice, maxprice } = PricesFilter;

  return (
    <Layout>
      <Filters
        isFilter={isFilter}
        typeFilter={typeFilter}
        minprice={minprice}
        maxprice={maxprice}
        handleChange={handleChange}
        setTypeFilter={setTypeFilter}
        getFilterAdverts={getFilterAdverts}
        resetFilters={resetFilters}
        arrayTags={arrayTags}
      />
      <ul className={styles.advertsList}>
        {adsFilter.length !== 0 ? (
          adsFilter.map((advert) => (
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
