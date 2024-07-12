import { useEffect, useRef, useState } from "react";
import Layout from "../../componentes/layout/Layout";
import Button from "../../componentes/shared/Button";
import FormField from "../../componentes/shared/FormField";
import styles from "./Newadvert.module.css";
import RadioButton from "../../componentes/shared/RadioButton";
import { useDispatch, useSelector } from "react-redux";
import { createAd, loadTags } from "../../store/actions";
import { getTags } from "../../store/selectors";

export function NewAdvert() {
  const dispatch = useDispatch();
  const tags = useSelector(getTags)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: null,
  });

  const { name, price, sale } = formData;

  const [selectedTags, setSelectedTags] = useState([]);

  const fileInputRef = useRef(null);

  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      createAd({
        name,
        price,
        sale,
        tags: selectedTags.join(),
        photo: fileInputRef.current.files[0],
      })
    );
  };

  const handleChange = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleButton = (type) => {
    setFormData((currentData) => ({
      ...currentData,
      ["sale"]: type === "sell",
    }));
  };

  const handleCheckChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) =>
        prevTags.filter((prevTag) => prevTag !== tag)
      );
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const resetError = () => {
    setError(null);
    setIsFetching(false);
  };

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className={styles.formFieldContainer}>
          <FormField
            type="text"
            name="name"
            label="Ad name"
            className="newAdvert-name"
            value={name}
            onChange={handleChange}
          />

          <FormField
            type="number"
            name="price"
            label="Ad price"
            className="newAdvert-price"
            value={price}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <RadioButton
          className={styles.radioContainer}
          title="Select type"
          name="sale"
          arrayInput={[
            {
              label: "To Sell",
              id: "sell",
              value: `${sale}`,
              onChange: () => handleButton("sell"),
            },
            {
              label: "To Buy",
              id: "buy",
              value: `${sale}`,
              onChange: () => handleButton("buy"),
            },
          ]}
        />

        <div>
          <p>Select your tags:</p>
          <div className={styles.tagContainer}>
            {tags.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleCheckChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.fileContainer}>
          <FormField
            type="file"
            name="img"
            label=""
            className="newAdvert-photo"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
          />
        </div>

        <Button
          type="submit"
          disabled={
            !name ||
            !price ||
            sale === null ||
            selectedTags.length === 0 ||
            isFetching
          }
        >
          Publish new ad
        </Button>
      </form>
      <div onClick={resetError}>{error ? error.statusText : null}</div>
    </Layout>
  );
}
