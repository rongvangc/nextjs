import { Grid, CircularProgress } from "@material-ui/core";
import styles from "./FeatureProduct.module.css";

import ProductCard from "../ProductCard/ProductCard";

const FeatureProduct = ({ tab, products, categories, onChangeTab }) => {
  return (
    <>
      <Grid item lg={12}>
        <div className={styles.TabPanel}>
          {categories?.map((cat) => (
            <button
              key={cat.node.id}
              className={tab === cat.node.slug ? styles.Active : ""}
              onClick={() => onChangeTab(cat.node.slug)}
            >
              {cat.node.name}
            </button>
          ))}
        </div>
      </Grid>
      <Grid item lg={12}>
        <div className={styles.ProductBox}>
          {products ? (
            products?.map((product) => (
              <div key={product.node.id} className={styles.Item}>
                <ProductCard
                  {...product.node}
                  feature
                  prefixUrl="menu"
                  activeCat
                />
              </div>
            ))
          ) : (
            <CircularProgress className="Spinner" />
          )}
        </div>
      </Grid>
    </>
  );
};

export default FeatureProduct;
