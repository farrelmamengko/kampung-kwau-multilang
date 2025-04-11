import React, { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";
import Modal from "../common/Modal";

export default function Services() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <CommonHeading
              // heading="Beberapa Potensi Lokal Yang Dimiliki Kampung Kwau"
              title="Kampung Kwau"
              subtitle="Beberapa Potensi Lokal Yang Dimiliki"
            />
          </div>
          <div className="row g-4">
          <div onClick={() => setOpenModal(!openModal)} type="button" className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <a className="service-item rounded">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i class="fa fa-spa fa-2x text-primary"></i>
                    </div>
                  </div>
                  <h5 className="mb-3">Pohon Pisang Hutan Raksasa (Musa Ingens W.Simmonds)</h5>
                  <p className="text-body mb-0">Kampung Kwau menjadi habitat dari pohon pisang hutan raksasa yang merupakan salah satu spesies endemik Papua. Pohon pisang ini dapat tumbuh hingga tinggi 20 meter dan memiliki daun yang sangat besar.</p>
                </a>
              </div>
            {services.map((item, index) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <a className="service-item rounded" href="">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                  </div>
                  <h5 className="mb-3">{item.name}</h5>
                  <p className="text-body mb-0">{item.discription}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <p>
          coba
        </p>
      </Modal>
    </>
  );
}
