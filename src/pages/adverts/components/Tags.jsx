import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableTags, selectedTags } from "../../../store/selectors";
import { getAdvertTags } from "../../../store/actions";

function Tags() {
  const dispatch = useDispatch();
  const defaultTags = useSelector(availableTags)
  const selectTags = useSelector(selectedTags)

  useEffect(() => {
    dispatch(getAdvertTags());
  }, [dispatch]);

  const handleCheckboxChange = (tag) => {
      dispatch(selectedTags(tag))
  };

  return (
    <div>
      {defaultTags.map((tag) => (
        <div key={tag}>
          <input
            type="checkbox"
            id={tag}
            checked={selectTags.includes(tag)}
            onChange={ () => handleCheckboxChange(tag)}
          />
          <label htmlFor={tag}>{tag}</label>
        </div>
      ))}
    </div>
  );
}

export default Tags;
