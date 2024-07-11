import styles from "./Filters.module.css";
import RadioButton from "../../../componentes/shared/RadioButton";
import FormField from "../../../componentes/shared/FormField";
import PropTypes from "prop-types";

export default function Filters({
  isFilter,
  typeFilter,
  minprice,
  maxprice,
  handleChange,
  setTypeFilter,
  getFilterAdverts,
  resetFilters,
}) {
  return (
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
            Type: {typeFilter === "" ? "No filter" : `To ${typeFilter} adverts`}
          </p>
          <h3>Price:</h3>
          <p>Min price = {minprice === "" ? "No filter" : `${minprice} EUR`}</p>
          <p>Max price = {maxprice === "" ? "No filter" : `${maxprice} EUR`}</p>
        </div>
      )}
      <button
        className={styles.filterButton}
        disabled={
          isFilter || (minprice === "" && maxprice === "" && typeFilter === "")
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
  );
}

Filters.propTypes = {
  isFilter: PropTypes.boolean,
  typeFilter: PropTypes.string,
  minprice: PropTypes.number,
  maxprice: PropTypes.number,
  handleChange: PropTypes.function,
  setTypeFilter: PropTypes.string,
  getFilterAdverts: PropTypes.function,
  resetFilters: PropTypes.function,
};
