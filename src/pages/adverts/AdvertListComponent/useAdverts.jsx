import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdverts, getSelectedTags, getTags } from "../../../store/selectors";
import {
  addSelectedTag,
  loadAdverts,
  loadTags,
  selectedTags,
} from "../../../store/actions";

export const useAdverts = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const navigate = useNavigate();
  const tags = useSelector(getTags);
  const checkedTags = useSelector(getSelectedTags);

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
      dispatch(loadTags());
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

  const handleCheckboxChange = (tag) => {
    if (checkedTags.includes(tag)) {
      const newtags = checkedTags.filter((item) => item !== tag);
      dispatch(selectedTags(newtags));
    } else {
      dispatch(addSelectedTag(tag));
    }
  };

  const getFilterAdverts = () => {

    let advertsFilterByTag = [];
    if (checkedTags.length > 0) {
      adverts.map((advert) => {
        advert.tags.map((itemTag) => {
          if (
            checkedTags.includes(itemTag) &&
            !advertsFilterByTag.includes(advert)
          ) {
            advertsFilterByTag.push(advert);
          }
        });
      });
    }

    let sale = true || false;
    if (typeFilter === "sell") {
      sale = true;
    } else if (typeFilter === "buy") {
      sale = false;
    }

    setAdsFilter(
      advertsFilterByTag.filter(
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
    dispatch(selectedTags([]))
  };

  const arrayTags = [];
  tags.map((tag) => {
    const item = {
      label: tag,
      id: tag,
      value: tag,
      onChange: () => handleCheckboxChange(tag),
      checked: checkedTags.includes(tag),
    };
    arrayTags.push(item);
  });

  // ];

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
    arrayTags,
  };
};
