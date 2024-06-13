import PropTypes from "prop-types";
import styles from "./Advert.module.css";

function Advert({ name, sale, price, tags, photo }) {
  return (
    <>
      <p className={styles.advertPrice}>{price} EUR</p>
      <img
        className={styles.advertImg}
        src={photo || "./src/assets/noimg.png"}
      />
      <p className={styles.advertName}>{name}</p>
      <div className={styles.advertText}>
        <div className={styles.advertTags}>{tags.toString()}</div>
        <div className={styles.advertSale}>{sale ? "To Sell" : "To Buy"}</div>
      </div>
    </>
  );
}

Advert.propTypes = {
  name: PropTypes.string,
  sale: PropTypes.bool,
  price: PropTypes.number,
  tags: PropTypes.string,
  photo: PropTypes.string,
};

export default Advert;
