import React from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/common/Heading";
import CommonHeading from "../components/common/CommonHeading";
import { contact } from "../components/data/Data";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <Heading heading="Contact" title="Home" subtitle="Contact" />

      <div class="container-xxl py-5">
        <div class="container">
          <CommonHeading
            heading={t('pages:contact.title')}
            subtitle={t('pages:contact.subtitle')}
            title={t('pages:contact.description')}
          />
          <div class="row g-4">
            <div class="col-12">
              <div class="row gy-4">
                {contact.map((item, index) => (
                  <div class="col-md-4">
                    <h6 class="section-title text-start text-primary text-uppercase">
                      {item.title}
                    </h6>
                    <p>
                      {item.icon}
                      {item.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div class="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <iframe
                class="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4883.004456391534!2d133.8981272086163!3d-1.001976516834592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d53e50040edad93%3A0xc4ffe06a669cd94c!2sKampung%20Kwau%20Distrik%20Mokwam!5e0!3m2!1sid!2sid!4v1743926183968!5m2!1sid!2sid"
                frameborder="0"
                style={{ minHeight: "350px", border: "0" }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
            <div class="col-md-6">
              <div class="wow fadeInUp" data-wow-delay="0.2s">
                <form>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label for="name">{t('pages:contact.form.name')}</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label for="email">{t('pages:contact.form.email')}</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                        <label for="subject">{t('pages:contact.form.subject')}</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <textarea
                          class="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "150px" }}
                        ></textarea>
                        <label for="message">{t('pages:contact.form.message')}</label>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100 py-3" type="submit">
                        {t('pages:contact.form.submit')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4883.004456391534!2d133.8981272086163!3d-1.001976516834592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d53e50040edad93%3A0xc4ffe06a669cd94c!2sKampung%20Kwau%20Distrik%20Mokwam!5e0!3m2!1sid!2sid!4v1743926183968!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
