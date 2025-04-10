import React from "react";
import Heading from "../common/Heading";
import { about } from "../data/Data";

export default function About() {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">
                Kampung Kwau
              </h6>
              <h1 className="mb-4">
                Selamat Datang Di{" "}
                <span className="text-primary text-uppercase">Kampung Kwau</span>
              </h1>
              <p className="mb-4">
              Kampung Kwau, yang terletak di Distrik Mokwam, Kabupaten Manokwari, Papua
              Barat, dikenal sebagai kawasan hutan konservasi dengan keanekaragaman hayati yang luar biasa,
              terutama burung endemik Papua. Selain menjadi habitat alami bagi berbagai spesies langka,
              Kampung Kwau juga memiliki potensi besar sebagai destinasi wisata berbasis alam yang menarik
              bagi wisatawan lokal maupun mancanegara.
              </p>
              <a className="btn btn-primary py-3 px-5 mt-2" href="/about">
                Explore More
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="/assets/img/minum.JPG"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="/assets/img/airterjun.JPG"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="/assets/img/kali.JPG"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="/assets/img/pisang.JPG"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
