import HomeBookingSearch from "@/components/common/HomeBookingSearch";
import { getActiveHeroBanner } from "@/lib/api/heroBanner";

import styles from "./page.module.css";

export default async function HomePage() {
  const heroBanner = await getActiveHeroBanner().catch(() => null);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          {heroBanner ? (
            <>
              <img
                alt={heroBanner.title}
                className={styles.heroImage}
                src={heroBanner.image}
              />
              <div className={styles.heroOverlay} />
            </>
          ) : (
            <div className={styles.heroFallback}>
              <span className={styles.heroFallbackLabel}>
                Image failed to load
              </span>
            </div>
          )}
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.searchPanel}>
              <HomeBookingSearch />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.welcomeSection}>
        <div className={styles.welcomeInner}>
          <p className={styles.welcomeEyebrow}>
            {heroBanner ? heroBanner.headline : "Welcome to our page!"}
          </p>
          <h2 className={styles.welcomeTitle}>
            A calm arrival, designed around your stay
          </h2>
          <p className={styles.welcomeCopy}>
            At KsVill Hotel, we believe your journey deserves more than just a
            place to sleep. That&apos;s why we&apos;ve created rooms that blend
            style, comfort, and practicality, ensuring you feel at home from the
            moment you arrive. Explore our offerings and let us make your stay
            an experience to remember.
          </p>
        </div>
      </section>
    </div>
  );
}
