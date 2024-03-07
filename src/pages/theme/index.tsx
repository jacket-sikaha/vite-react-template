import { Suspense, useState } from "react";
import styles from "./css/style.module.css"; // 只跟引入方式有关，与文件名无关，现在还是普通导入不是css module
import img1 from "./img/team-1.jpg";
import img2 from "./img/team-2.jpg";
import img3 from "./img/team-3.jpg";
import img4 from "./img/team-4.jpg";

const themes = ["light", "dark", "cupcake", "retro", "valentine"];
function Theme() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <div className="flex">
        {themes.map((item) => {
          return (
            <button key={item} onClick={() => setTheme(item)}>
              {item}
            </button>
          );
        })}
      </div>
      <div data-theme={theme} className="bg-th-bg text-th-text overflow-auto">
        <section>
          <div className={styles["testimonial-container"]}>
            <div className="row h-full">
              <div className="col-md-12">
                <div className="main-title wow fadeIn" data-wow-delay="300ms">
                  <br />
                  <h1 className="text-center"> NICE TESTIMONIALS </h1>
                </div>
              </div>
            </div>
            <br />
            <div className="row m-0">
              <div className="col-sm-12 h-[700px]">
                <div className={styles["owl-carousel"]}>
                  <div className={styles["testimonial-item"]}>
                    <div className={styles["testimonial-box"]}>
                      <div className={styles["testimonial-text"]}>
                        <p>
                          Donec semper euismod nisi quis feugiat. Nullam finibus
                          metus eget orci volutpat porta. Morbi quis arcu
                          vulputate, dignissim mi ac, varius magna. porta.
                          dignissim mi ac, varius magna.
                        </p>
                        <span className={styles["testimonial-date"]}>
                          December 20, 2018
                        </span>
                        <span className={styles["testimonial-arrow"]}></span>
                      </div>
                    </div>
                    <div className={styles["testimonial-photo"]}>
                      <img alt="" src={img1} />
                    </div>
                    <h5 className="text-capitalize color-black mt-3 mb-1">
                      Robin T Philips
                    </h5>
                    <p className="color-pink">Businessman</p>
                  </div>
                  <div className={styles["testimonial-item"]}>
                    <div className={styles["testimonial-text"]}>
                      <p>
                        Donec semper euismod nisi quis feugiat. Nullam finibus
                        metus eget orci volutpat porta. Morbi quis arcu
                        vulputate, dignissim mi ac, varius magna. porta.
                        dignissim mi ac, varius magna.{" "}
                      </p>
                      <span className={styles["testimonial-date"]}>
                        October 13, 2018
                      </span>
                      <span className={styles["testimonial-arrow"]}></span>
                    </div>
                    <div className={styles["testimonial-photo"]}>
                      <img alt="" src={img2} />
                    </div>
                    <h5 className="text-capitalize color-black mt-3 mb-1">
                      Jessica Oliver
                    </h5>
                    <p className="color-pink">Model</p>
                  </div>
                  <div className={styles["testimonial-item"]}>
                    <div className={styles["testimonial-text"]}>
                      <p>
                        Donec semper euismod nisi quis feugiat. Nullam finibus
                        metus eget orci volutpat porta. Morbi quis arcu
                        vulputate, dignissim mi ac, varius magna. porta.
                        dignissim mi ac, varius magna.{" "}
                      </p>
                      <span className={styles["testimonial-date"]}>
                        April 23, 2018
                      </span>
                      <span className={styles["testimonial-arrow"]}></span>
                    </div>
                    <div className={styles["testimonial-photo"]}>
                      <img alt="" src={img3} />
                    </div>
                    <h5 className="text-capitalize color-black mt-3 mb-1">
                      Teena Williamson
                    </h5>
                    <p className="color-pink">SEO Specialist</p>
                  </div>
                  <div className={styles["testimonial-item"]}>
                    <div className={styles["testimonial-text"]}>
                      <p>
                        Donec semper euismod nisi quis feugiat. Nullam finibus
                        metus eget orci volutpat porta. Morbi quis arcu
                        vulputate, dignissim mi ac, varius magna. porta.
                        dignissim mi ac, varius magna.
                      </p>
                      <span className={styles["testimonial-date"]}>
                        June 04, 2018
                      </span>
                      <span className={styles["testimonial-arrow"]}></span>
                    </div>
                    <div className={styles["testimonial-photo"]}>
                      <img alt="" src={img4} />
                    </div>
                    <h5 className="text-capitalize color-black mt-3 mb-1">
                      Micheal Anderson
                    </h5>
                    <p className="color-pink">The New Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Theme;
