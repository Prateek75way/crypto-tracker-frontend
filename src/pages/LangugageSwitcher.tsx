import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
        {t("welcome")}
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("es")}>Español</Button>
      <Button onClick={() => changeLanguage("fr")}>Français</Button>
    </div>
  );
};

export default LanguageSwitcher;
