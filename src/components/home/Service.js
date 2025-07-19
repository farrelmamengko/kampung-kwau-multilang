import React, { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";
import Modal from "../common/Modal";

export default function Services() {
  const [openModal, setOpenModal] = useState(false)
  const [openBirdModal, setOpenBirdModal] = useState(false)
  const [openButterflyModal, setOpenButterflyModal] = useState(false)
  const [openWaterfallModal, setOpenWaterfallModal] = useState(false)
  const [openOrchidModal, setOpenOrchidModal] = useState(false)
  const [openDanceModal, setOpenDanceModal] = useState(false)
  const [openHouseModal, setOpenHouseModal] = useState(false)

  const handleServiceClick = (serviceName) => {
    if (serviceName === "Birds Watching") {
      setOpenBirdModal(true);
    } else if (serviceName === "Keanekaragaman Kupu-Kupu") {
      setOpenButterflyModal(true);
    } else if (serviceName === "Air Terjun") {
      setOpenWaterfallModal(true);
    } else if (serviceName === "Macam-macam tanaman angrek") {
      setOpenOrchidModal(true);
    } else if (serviceName === "Tari Tumbu Tanah") {
      setOpenDanceModal(true);
    } else if (serviceName === "Rumah Kaki Seribu") {
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
              title="Kampung Kwau"
              subtitle="Beberapa Potensi Lokal Yang Dimiliki"
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
                  <h5 className="mb-3">Pohon Pisang Hutan Raksasa (Musa Ingens W.Simmonds)</h5>
                  <p className="text-body mb-0">Kampung Kwau menjadi habitat dari pohon pisang hutan raksasa yang merupakan salah satu spesies endemik Papua. Pohon pisang ini dapat tumbuh hingga tinggi 20 meter dan memiliki daun yang sangat besar.</p>
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
                  <h5 className="mb-3">{item.name}</h5>
                  <p className="text-body mb-0">{item.discription}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal untuk Pohon Pisang Hutan Raksasa */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Pohon Pisang Hutan Raksasa (Musa Ingens W.Simmonds)</Modal.Header>
        <Modal.Body>
        <p>
        Kampung Kwau menjadi habitat dari pohon pisang hutan raksasa yang merupakan salah satu spesies endemik Papua. Pohon pisang ini dapat tumbuh hingga tinggi 20 meter dan memiliki daun yang sangat besar.
        </p>
        <img src="/assets/img/pisang.JPG" alt="Pohon Pisang Hutan Raksasa" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Birds Watching */}
      <Modal isOpen={openBirdModal} onClose={() => setOpenBirdModal(false)}>
        <Modal.Header>Birds Watching - Burung Endemik Papua</Modal.Header>
        <Modal.Body>
          <p>
            Daya Tarik Utama Kampung Kwau adalah Burung Endemik Papua, salah satunya Western Parotia yang dinikmati melalui kegiatan Birds Watching. 
            Kampung Kwau adalah rumah bagi berbagai spesies burung endemik Papua yang langka dan eksotis.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Spesies Burung yang Dapat Diamati:</h6>
          <ul className="mb-3">
            <li><strong>Western Parotia (Parotia sefilata)</strong> - Burung cendrawasih dengan bulu yang menawan</li>
            <li><strong>Burung Raja Papua</strong> - Salah satu burung paling indah di dunia</li>
            <li><strong>Burung Mambruk</strong> - Merpati mahkota dengan keunikan tersendiri</li>
            <li><strong>Burung Kasuari</strong> - Burung besar yang tidak bisa terbang namun sangat unik</li>
          </ul>

          <h6 className="text-primary mb-3">Waktu Terbaik untuk Bird Watching:</h6>
          <ul className="mb-3">
            <li>Pagi hari (05:30 - 08:00): Aktivitas burung paling tinggi</li>
            <li>Sore hari (16:00 - 18:00): Burung kembali ke sarang</li>
            <li>Musim kering (April - September): Visibility terbaik</li>
          </ul>

          <h6 className="text-primary mb-3">Fasilitas yang Tersedia:</h6>
          <ul className="mb-4">
            <li>Guide lokal berpengalaman</li>
            <li>Teropong binoculars</li>
            <li>Bird watching tower</li>
            <li>Trail map dan bird checklist</li>
          </ul>

          <img src="/assets/img/Burung.png" alt="Burung Endemik Papua" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Keanekaragaman Kupu-Kupu */}
      <Modal isOpen={openButterflyModal} onClose={() => setOpenButterflyModal(false)}>
        <Modal.Header>Keanekaragaman Kupu-Kupu Papua</Modal.Header>
        <Modal.Body>
          <p>
            Kampung Kwau menjadi rumah bagi berbagai spesies kupu-kupu yang indah dan beragam, menjadikannya tempat yang menarik untuk pengamatan kupu-kupu. 
            Hutan tropis Papua memiliki keanekaragaman kupu-kupu yang luar biasa dengan warna-warna eksotis yang memukau.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Spesies Kupu-Kupu yang Dapat Diamati:</h6>
          <ul className="mb-3">
            <li><strong>Kupu-kupu Raja (Troides helena)</strong> - Kupu-kupu berukuran besar dengan sayap emas mengkilap</li>
            <li><strong>Kupu-kupu Sayap Burung (Ornithoptera priamus)</strong> - Salah satu kupu-kupu terbesar di dunia</li>
            <li><strong>Kupu-kupu Ekor Walet (Papilio ulysses)</strong> - Biru metalik yang memukau</li>
            <li><strong>Kupu-kupu Daun (Kallima paralekta)</strong> - Ahli penyamaran seperti daun kering</li>
            <li><strong>Kupu-kupu Morfo Papua</strong> - Biru elektrik yang berkilauan</li>
          </ul>

          <h6 className="text-primary mb-3">Waktu Terbaik untuk Pengamatan:</h6>
          <ul className="mb-3">
            <li>Pagi hari (08:00 - 11:00): Kupu-kupu aktif mencari nektar</li>
            <li>Siang hari cerah: Aktivitas optimal di area terbuka</li>
            <li>Setelah hujan: Kupu-kupu bermunculan dalam jumlah banyak</li>
            <li>Musim berbunga (Oktober - Februari): Varietas terbanyak</li>
          </ul>

          <h6 className="text-primary mb-3">Lokasi Pengamatan Terbaik:</h6>
          <ul className="mb-3">
            <li>Area tepi hutan: Transisi habitat</li>
            <li>Sungai dan mata air: Tempat minum kupu-kupu</li>
            <li>Kebun bunga lokal: Sumber nektar</li>
            <li>Trail hutan: Berbagai spesies hutan</li>
          </ul>

          <h6 className="text-primary mb-3">Tips Pengamatan:</h6>
          <ul className="mb-4">
            <li>Gunakan pakaian berwarna cerah untuk menarik kupu-kupu</li>
            <li>Bergerak perlahan dan hindari gerakan mendadak</li>
            <li>Bawa kamera dengan lensa makro</li>
            <li>Gunakan guide lokal untuk identifikasi spesies</li>
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">
              "Papua adalah rumah bagi lebih dari 600 spesies kupu-kupu, menjadikannya surga bagi para pecinta lepidoptera"
            </em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Air Terjun */}
      <Modal isOpen={openWaterfallModal} onClose={() => setOpenWaterfallModal(false)}>
        <Modal.Header>Air Terjun Kampung Kwau</Modal.Header>
        <Modal.Body>
          <p>
            Air Terjun di Kampung Kwau adalah daya tarik alam yang menakjubkan, menawarkan pemandangan spektakuler dan suasana yang menenangkan. 
            Dikelilingi oleh hutan tropis yang masih asri, air terjun ini menjadi oasis alami yang sempurna untuk relaksasi dan petualangan.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Karakteristik Air Terjun:</h6>
          <ul className="mb-3">
            <li><strong>Ketinggian:</strong> Sekitar 25-30 meter dengan multiple cascade</li>
            <li><strong>Debit Air:</strong> Stabil sepanjang tahun, paling deras saat musim hujan</li>
            <li><strong>Kolam Alami:</strong> Kedalaman 2-3 meter, aman untuk berenang</li>
            <li><strong>Suhu Air:</strong> Sejuk dan segar (18-22°C)</li>
            <li><strong>Kualitas Air:</strong> Jernih dan bersih langsung dari mata air pegunungan</li>
          </ul>

          <h6 className="text-primary mb-3">Aktivitas yang Dapat Dilakukan:</h6>
          <ul className="mb-3">
            <li>Berenang di kolam alami</li>
            <li>Fotografi landscape dan nature</li>
            <li>Meditasi dan yoga di tepi air</li>
            <li>Trekking di sekitar area air terjun</li>
            <li>Piknik keluarga di area yang telah disediakan</li>
          </ul>

          <h6 className="text-primary mb-3">Akses dan Fasilitas:</h6>
          <ul className="mb-3">
            <li><strong>Jarak dari kampung:</strong> 1.5 km (trekking 30-45 menit)</li>
            <li><strong>Tingkat kesulitan:</strong> Mudah hingga sedang</li>
            <li><strong>Trail:</strong> Sudah dibuat jalur setapak yang aman</li>
            <li><strong>Fasilitas:</strong> Area istirahat, toilet sederhana, tempat ganti</li>
          </ul>

          <h6 className="text-primary mb-3">Waktu Terbaik Berkunjung:</h6>
          <ul className="mb-4">
            <li><strong>Musim kering (April-September):</strong> Air jernih, akses mudah</li>
            <li><strong>Pagi hari (07:00-10:00):</strong> Cahaya terbaik untuk foto</li>
            <li><strong>Sore hari (15:00-17:00):</strong> Suasana romantis</li>
            <li><strong>Setelah hujan:</strong> Volume air maksimal (hati-hati licin)</li>
          </ul>

          <img src="/assets/img/airterjun.JPG" alt="Air Terjun Kampung Kwau" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Macam-macam tanaman angrek */}
      <Modal isOpen={openOrchidModal} onClose={() => setOpenOrchidModal(false)}>
        <Modal.Header>Keanekaragaman Tanaman Anggrek Papua</Modal.Header>
        <Modal.Body>
          <p>
            Anggrek merupakan salah satu tanaman hias yang banyak diminati oleh masyarakat. Di Kampung Kwau, terdapat berbagai jenis anggrek yang tumbuh subur dan indah, 
            menjadikan kawasan ini sebagai surga bagi para pecinta anggrek dan botani.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Spesies Anggrek Endemik Papua:</h6>
          <ul className="mb-3">
            <li><strong>Dendrobium nobile Papua</strong> - Anggrek dendrobium dengan bunga putih keunguan</li>
            <li><strong>Paphiopedilum mastersianum</strong> - Anggrek kantong semar dengan corak unik</li>
            <li><strong>Bulbophyllum papuanum</strong> - Anggrek mikro dengan aroma khas</li>
            <li><strong>Coelogyne asperata</strong> - Anggrek putih dengan kelopak berbintik</li>
            <li><strong>Cymbidium hartinahianum</strong> - Anggrek besar dengan bunga kuning</li>
          </ul>

          <h6 className="text-primary mb-3">Habitat dan Karakteristik:</h6>
          <ul className="mb-3">
            <li><strong>Epiphytic:</strong> Tumbuh menempel pada pohon hutan</li>
            <li><strong>Terrestrial:</strong> Tumbuh di tanah dengan humus tebal</li>
            <li><strong>Lithophytic:</strong> Tumbuh di celah-celah batu</li>
            <li><strong>Ketinggian:</strong> 500-2000 mdpl dengan iklim sejuk</li>
            <li><strong>Kelembaban:</strong> 70-85% sepanjang tahun</li>
          </ul>

          <h6 className="text-primary mb-3">Musim Berbunga:</h6>
          <ul className="mb-3">
            <li><strong>Musim kering (Juni-September):</strong> Dendrobium dan Bulbophyllum</li>
            <li><strong>Musim hujan (Desember-Maret):</strong> Paphiopedilum dan Coelogyne</li>
            <li><strong>Sepanjang tahun:</strong> Cymbidium (dengan peak tertentu)</li>
            <li><strong>Kondisi khusus:</strong> Beberapa spesies berbunga setelah periode kering</li>
          </ul>

          <h6 className="text-primary mb-3">Konservasi dan Edukasi:</h6>
          <ul className="mb-3">
            <li>Program konservasi in-situ di habitat asli</li>
            <li>Pembibitan dan kultur jaringan</li>
            <li>Edukasi masyarakat tentang perlindungan anggrek</li>
            <li>Penelitian keanekaragaman dan ekologi</li>
          </ul>

          <h6 className="text-primary mb-3">Tips Mengamati Anggrek:</h6>
          <ul className="mb-4">
            <li>Gunakan kaca pembesar untuk detail bunga</li>
            <li>Jangan memetik atau merusak tanaman</li>
            <li>Dokumentasi dengan foto dari berbagai sudut</li>
            <li>Catat lokasi dan kondisi habitat</li>
            <li>Gunakan guide lokal untuk identifikasi</li>
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">
              "Papua memiliki lebih dari 300 spesies anggrek, 40% diantaranya adalah spesies endemik yang tidak ditemukan di tempat lain"
            </em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Tari Tumbu Tanah */}
      <Modal isOpen={openDanceModal} onClose={() => setOpenDanceModal(false)}>
        <Modal.Header>Tari Tumbu Tanah - Warisan Budaya Suku Arfak</Modal.Header>
        <Modal.Body>
          <p>
            Kampung Kwau juga menawarkan pengalaman budaya yang kaya, termasuk tarian tradisional yang berasal dari suku Arfak yaitu Tari Tumbu Tanah. 
            Tarian ini merupakan bagian penting dari budaya masyarakat setempat dan sering ditampilkan dalam acara-acara adat.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Makna dan Filosofi:</h6>
          <ul className="mb-3">
            <li><strong>Tumbu:</strong> Berarti "menghormati" dalam bahasa Arfak</li>
            <li><strong>Tanah:</strong> Melambangkan bumi dan alam yang memberikan kehidupan</li>
            <li><strong>Filosofi:</strong> Ungkapan rasa syukur kepada alam dan leluhur</li>
            <li><strong>Spiritualitas:</strong> Koneksi antara manusia, alam, dan dunia spiritual</li>
            <li><strong>Identitas:</strong> Simbol kebanggaan dan identitas suku Arfak</li>
          </ul>

          <h6 className="text-primary mb-3">Gerakan dan Elemen Tari:</h6>
          <ul className="mb-3">
            <li><strong>Gerakan Kaki:</strong> Meniru langkah hewan hutan seperti kasuari</li>
            <li><strong>Gerakan Tangan:</strong> Melambangkan sayap burung dan ranting pohon</li>
            <li><strong>Formasi:</strong> Lingkaran yang melambangkan siklus kehidupan</li>
            <li><strong>Tempo:</strong> Dimulai lambat, semakin cepat menuju klimaks</li>
            <li><strong>Koordinasi:</strong> Harmoni antara penari pria dan wanita</li>
          </ul>

          <h6 className="text-primary mb-3">Kostum dan Properti:</h6>
          <ul className="mb-3">
            <li><strong>Bulu Cendrawasih:</strong> Hiasan kepala simbol keindahan</li>
            <li><strong>Koteka/Rok Kulit:</strong> Pakaian tradisional berbahan alam</li>
            <li><strong>Aksesoris Manik:</strong> Perhiasan dari manik-manik warna-warni</li>
            <li><strong>Cat Tubuh:</strong> Motif tradisional dengan pewarna alami</li>
            <li><strong>Alat Musik:</strong> Tifa, suling bambu, dan gong tradisional</li>
          </ul>

          <h6 className="text-primary mb-3">Acara dan Pertunjukan:</h6>
          <ul className="mb-3">
            <li><strong>Ritual Adat:</strong> Upacara pernikahan, inisiasi, panen</li>
            <li><strong>Festival Budaya:</strong> Perayaan tahunan dan hari besar</li>
            <li><strong>Penyambutan Tamu:</strong> Welcome ceremony untuk wisatawan</li>
            <li><strong>Edukasi:</strong> Pembelajaran budaya untuk generasi muda</li>
          </ul>

          <h6 className="text-primary mb-3">Pengalaman Wisatawan:</h6>
          <ul className="mb-4">
            <li>Menonton pertunjukan langsung dengan penari asli</li>
            <li>Belajar gerakan dasar dari maestro tari lokal</li>
            <li>Memahami makna setiap gerakan dan simbolisme</li>
            <li>Foto bersama dengan kostum tradisional</li>
            <li>Workshop membuat properti tari sederhana</li>
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">
              "Tari Tumbu Tanah bukan hanya pertunjukan, tetapi doa bergerak yang menghubungkan manusia dengan alam semesta"
            </em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Rumah Kaki Seribu */}
      <Modal isOpen={openHouseModal} onClose={() => setOpenHouseModal(false)}>
        <Modal.Header>Rumah Kaki Seribu - Arsitektur Tradisional Arfak</Modal.Header>
        <Modal.Body>
          <p>
            Rumah Kaki Seribu adalah salah satu daya tarik unik di Kampung Kwau. Rumah ini terbuat dari kayu dan memiliki desain yang khas, 
            dengan banyak tiang penyangga yang menyerupai kaki seribu. Arsitektur tradisional ini mencerminkan kearifan lokal dalam beradaptasi dengan alam.
          </p>
          
          <h6 className="text-primary mt-4 mb-3">Konstruksi dan Material:</h6>
          <ul className="mb-3">
            <li><strong>Tiang Utama:</strong> Kayu ulin atau kayu besi yang tahan lama</li>
            <li><strong>Dinding:</strong> Kombinasi kayu dan bambu dengan ventilasi alami</li>
            <li><strong>Atap:</strong> Daun sagu atau rumbia yang kedap air</li>
            <li><strong>Lantai:</strong> Papan kayu dengan celah untuk sirkulasi udara</li>
            <li><strong>Fondasi:</strong> Batu sungai sebagai alas tiang</li>
          </ul>

          <h6 className="text-primary mb-3">Filosofi dan Makna:</h6>
          <ul className="mb-3">
            <li><strong>"Kaki Seribu":</strong> Melambangkan stabilitas dan kekuatan komunitas</li>
            <li><strong>Elevasi:</strong> Rumah panggung sebagai perlindungan dari binatang buas</li>
            <li><strong>Orientasi:</strong> Menghadap timur untuk menyambut cahaya matahari</li>
            <li><strong>Ruang Komunal:</strong> Area tengah untuk berkumpul dan ritual</li>
            <li><strong>Harmoni Alam:</strong> Desain yang menyatu dengan lingkungan</li>
          </ul>

          <h6 className="text-primary mb-3">Fungsi dan Ruangan:</h6>
          <ul className="mb-3">
            <li><strong>Ruang Utama:</strong> Area berkumpul keluarga besar</li>
            <li><strong>Ruang Tidur:</strong> Bilik-bilik terpisah untuk privasi</li>
            <li><strong>Dapur:</strong> Area memasak dengan perapian tradisional</li>
            <li><strong>Lumbung:</strong> Penyimpanan hasil panen dan peralatan</li>
            <li><strong>Teras:</strong> Tempat menerima tamu dan aktivitas harian</li>
          </ul>

          <h6 className="text-primary mb-3">Keunggulan Arsitektur:</h6>
          <ul className="mb-3">
            <li><strong>Tahan Gempa:</strong> Struktur fleksibel dengan sambungan tradisional</li>
            <li><strong>Ventilasi Alami:</strong> Sirkulasi udara yang optimal</li>
            <li><strong>Ramah Lingkungan:</strong> Material 100% dari alam</li>
            <li><strong>Efisiensi Energi:</strong> Tidak memerlukan pendingin ruangan</li>
            <li><strong>Mudah Diperbaiki:</strong> Sistem modular yang praktis</li>
          </ul>

          <h6 className="text-primary mb-3">Pengalaman Wisatawan:</h6>
          <ul className="mb-3">
            <li>Menginap dalam rumah tradisional autentik</li>
            <li>Belajar teknik konstruksi tradisional</li>
            <li>Workshop membuat miniatur rumah kaki seribu</li>
            <li>Mendengar cerita dan legenda dari tetua adat</li>
            <li>Merasakan kehidupan komunal masyarakat Arfak</li>
          </ul>

          <h6 className="text-primary mb-3">Konservasi dan Pelestarian:</h6>
          <ul className="mb-4">
            <li>Program pelatihan untuk generasi muda</li>
            <li>Dokumentasi teknik konstruksi tradisional</li>
            <li>Penelitian material dan metode ramah lingkungan</li>
            <li>Revitalisasi rumah-rumah tua yang rusak</li>
            <li>Integrasi dengan pariwisata berkelanjutan</li>
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">
              "Rumah Kaki Seribu adalah bukti kearifan nenek moyang dalam menciptakan hunian yang selaras dengan alam"
            </em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Keluar</Modal.DismissButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
