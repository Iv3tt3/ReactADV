// useAdverts.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdverts } from "../../../store/selectors";
import { loadAdverts } from "../../../store/actions";

export const useAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const navigate = useNavigate();

  const [adsFilter, setAdsFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [PricesFilter, setPricesFilter] = useState({
    minprice: "",
    maxprice: "",
  });
  const { minprice, maxprice } = PricesFilter;
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    try {
      dispatch(loadAdverts());
      setAdsFilter(adverts);
    } catch (error) {
      if (error.status === 404) navigate("/404");
    }
  }, [navigate, dispatch, adverts]);

  const handleChange = (event) => {
    setPricesFilter((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const getFilterAdverts = () => {
    let sale = true || false;
    if (typeFilter === "sell") {
      sale = true;
    } else if (typeFilter === "buy") {
      sale = false;
    }

    setAdsFilter(
      adverts.filter(
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
      maxprice: "",
      minprice: "",
    });
    setTypeFilter("");
    setAdsFilter(adverts);
    setIsFilter(false);
  };

  return {
    adverts,
    adsFilter,
    typeFilter,
    PricesFilter,
    isFilter,
    handleChange,
    getFilterAdverts,
    resetFilters,
    setTypeFilter,
  };
};
