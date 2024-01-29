import styles from "./Product.module.css";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just &#8377; 199/month.
          </h2>
          <p>
            Your Adventure and memories tracker for your trip down the memory
            lane.
            <br />
            Subscribe now for enjoying all the current and upcoming features.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
