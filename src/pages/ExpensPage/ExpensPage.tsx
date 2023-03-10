import { useEffect } from "react";
import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";
import "./expens.scss";

export const ExpensPage = () => {
  useEffect(() => {
    changeBody(ChangeBgPages.EXPENS);
  }, []);
  return (
    <section className="page-bg-move">
      <article className="page-content-move">
        <h2>Расходы</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima,
          veniam illum consequatur rerum dicta vel dolor repellendus incidunt
          non optio. Eos iste officiis magni consequatur voluptatum? Inventore
          dolorem ad facilis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Et sint a dicta officia, voluptas quasi deserunt nostrum quia
          soluta error dolorem sapiente sunt cum, pariatur quas id nulla,
          dolorum tempora! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Fugiat minus perspiciatis vitae adipisci, natus culpa? Odit
          ullam blanditiis ad, laboriosam ipsam omnis fugit hic quo ratione
          dicta quasi officia consequuntur.
        </p>
      </article>
    </section>
  );
};
