import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";
import T from "prop-types";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: T.node,
};
