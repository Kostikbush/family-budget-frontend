import { useEffect } from "react";

import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";

import { AlertsFromUsers } from "./AlertsFromUsers/AlertsFromUsers";
import { ContentInfo } from "./ContentInfo/ContentInfo";
import "./home.scss";

export const HomePage = () => {
  useEffect(() => {
    changeBody(ChangeBgPages.HOME);
  }, []);
  return (
    <section className="app-home-wrapper">
      <article className="app-home-page-content page-content-move">
        <AlertsFromUsers />
        <ContentInfo />
      </article>
    </section>
  );
};
