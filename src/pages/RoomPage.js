import React from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/common/Heading";
import Rooms from "../components/home/Rooms";

export default function Room() {
  const { t } = useTranslation();

  return (
    <>
      <Heading heading={t('pages:tourPackage.title')} title="Home" subtitle={t('pages:tourPackage.title')} />
      <Rooms />
    </>
  );
}
