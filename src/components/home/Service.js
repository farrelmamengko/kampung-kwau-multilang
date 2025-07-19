import React, { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";
import Modal from "../common/Modal";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false)
  const [openBirdModal, setOpenBirdModal] = useState(false)
  const [openButterflyModal, setOpenButterflyModal] = useState(false)
  const [openWaterfallModal, setOpenWaterfallModal] = useState(false)
  const [openOrchidModal, setOpenOrchidModal] = useState(false)
  const [openDanceModal, setOpenDanceModal] = useState(false)
  const [openHouseModal, setOpenHouseModal] = useState(false)

  const handleServiceClick = (serviceName) => {
    if (serviceName === "birdWatching") {
      setOpenBirdModal(true);
    } else if (serviceName === "butterflies") {
      setOpenButterflyModal(true);
    } else if (serviceName === "waterfall") {
      setOpenWaterfallModal(true);
    } else if (serviceName === "orchids") {
      setOpenOrchidModal(true);
    } else if (serviceName === "dance") {
      setOpenDanceModal(true);
    } else if (serviceName === "house") {
      setOpenHouseModal(true);
    }
  }

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <CommonHeading
              // heading="Beberapa Potensi Lokal Yang Dimiliki Kampung Kwau"
              title={t('home:services.subtitle')}
              subtitle={t('home:services.title')}
            />
          </div>
          <div className="row g-4">
          <div onClick={() => setOpenModal(!openModal)} type="button" className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <a className="service-item rounded">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary"></i>
                    </div>
                  </div>
                  <h5 className="mb-3">{t('home:services.bananaTree.title')}</h5>
                  <p className="text-body mb-0">{t('home:services.bananaTree.description')}</p>
                </a>
              </div>
            {services.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleServiceClick(item.name)} 
                type="button" 
                className="col-lg-4 col-md-6 wow fadeInUp" 
                data-wow-delay="0.1s"
              >
                <a className="service-item rounded">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                  </div>
                  <h5 className="mb-3">{t(`home:services.${item.name}.title`)}</h5>
                  <p className="text-body mb-0">{t(`home:services.${item.discription}.description`)}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal untuk Pohon Pisang Hutan Raksasa */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{t('home:services.bananaTree.title')}</Modal.Header>
        <Modal.Body>
        <p>
        {t('home:services.bananaTree.description')}
        </p>
        <img src="/assets/img/pisang.JPG" alt="Pohon Pisang Hutan Raksasa" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Birds Watching */}
      <Modal isOpen={openBirdModal} onClose={() => setOpenBirdModal(false)}>
        <Modal.Header>{t('modal:birdWatching.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:birdWatching.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:birdWatching.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:birdWatching.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:birdWatching.bestTimeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:birdWatching.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:birdWatching.facilitiesTitle')}</h6>
          <ul className="mb-4">
            {t('modal:birdWatching.facilities', { returnObjects: true }).map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>

          <img src="/assets/img/Burung.png" alt="Burung Endemik Papua" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Keanekaragaman Kupu-Kupu */}
      <Modal isOpen={openButterflyModal} onClose={() => setOpenButterflyModal(false)}>
        <Modal.Header>{t('modal:butterflies.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:butterflies.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:butterflies.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.bestTimeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.locationsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.locations', { returnObjects: true }).map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.tipsTitle')}</h6>
          <ul className="mb-4">
            {t('modal:butterflies.tips', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:butterflies.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Air Terjun */}
      <Modal isOpen={openWaterfallModal} onClose={() => setOpenWaterfallModal(false)}>
        <Modal.Header>{t('modal:waterfall.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:waterfall.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:waterfall.characteristicsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.characteristics', { returnObjects: true }).map((characteristic, index) => (
              <li key={index}><strong>{characteristic.split(': ')[0]}:</strong> {characteristic.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.activitiesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.activities', { returnObjects: true }).map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.accessTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.access', { returnObjects: true }).map((access, index) => (
              <li key={index}><strong>{access.split(': ')[0]}:</strong> {access.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.bestTimeTitle')}</h6>
          <ul className="mb-4">
            {t('modal:waterfall.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}><strong>{time.split(': ')[0]}:</strong> {time.split(': ')[1]}</li>
            ))}
          </ul>

          <img src="/assets/img/airterjun.JPG" alt="Air Terjun Kampung Kwau" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Macam-macam tanaman angrek */}
      <Modal isOpen={openOrchidModal} onClose={() => setOpenOrchidModal(false)}>
        <Modal.Header>{t('modal:orchids.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:orchids.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:orchids.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.habitatTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.habitat', { returnObjects: true }).map((habitat, index) => (
              <li key={index}><strong>{habitat.split(': ')[0]}:</strong> {habitat.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.bloomingTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.blooming', { returnObjects: true }).map((blooming, index) => (
              <li key={index}><strong>{blooming.split(': ')[0]}:</strong> {blooming.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.conservationTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.conservation', { returnObjects: true }).map((conservation, index) => (
              <li key={index}>{conservation}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.tipsTitle')}</h6>
          <ul className="mb-4">
            {t('modal:orchids.tips', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:orchids.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Tari Tumbu Tanah */}
      <Modal isOpen={openDanceModal} onClose={() => setOpenDanceModal(false)}>
        <Modal.Header>{t('modal:dance.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:dance.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:dance.meaningTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.meaning', { returnObjects: true }).map((meaning, index) => (
              <li key={index}><strong>{meaning.split(': ')[0]}:</strong> {meaning.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.movementsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.movements', { returnObjects: true }).map((movement, index) => (
              <li key={index}><strong>{movement.split(': ')[0]}:</strong> {movement.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.costumeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.costume', { returnObjects: true }).map((costume, index) => (
              <li key={index}><strong>{costume.split(': ')[0]}:</strong> {costume.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.eventsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.events', { returnObjects: true }).map((event, index) => (
              <li key={index}><strong>{event.split(': ')[0]}:</strong> {event.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.experienceTitle')}</h6>
          <ul className="mb-4">
            {t('modal:dance.experience', { returnObjects: true }).map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:dance.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Rumah Kaki Seribu */}
      <Modal isOpen={openHouseModal} onClose={() => setOpenHouseModal(false)}>
        <Modal.Header>{t('modal:house.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:house.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:house.constructionTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.construction', { returnObjects: true }).map((construction, index) => (
              <li key={index}><strong>{construction.split(': ')[0]}:</strong> {construction.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.philosophyTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.philosophy', { returnObjects: true }).map((philosophy, index) => (
              <li key={index}><strong>{philosophy.split(': ')[0]}:</strong> {philosophy.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.functionTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.function', { returnObjects: true }).map((function_, index) => (
              <li key={index}><strong>{function_.split(': ')[0]}:</strong> {function_.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.advantagesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.advantages', { returnObjects: true }).map((advantage, index) => (
              <li key={index}><strong>{advantage.split(': ')[0]}:</strong> {advantage.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.experienceTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.experience', { returnObjects: true }).map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.conservationTitle')}</h6>
          <ul className="mb-4">
            {t('modal:house.conservation', { returnObjects: true }).map((conservation, index) => (
              <li key={index}>{conservation}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:house.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
