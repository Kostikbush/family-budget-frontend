import { useMemo, useState } from "react";
import "./helloPage.scss";
export const HelloPage = () => {
  const [isExitHelloPage, setIsExitHelloPage] = useState(false);
  useMemo(() => {
    setTimeout(() => {
      setIsExitHelloPage(!isExitHelloPage);
    }, 400000);
  }, [isExitHelloPage]);
  return (
    <main className={isExitHelloPage ? "page-exit" : "page-enter"}>
      <section className="hello-page-wrapper">
        <p>
          jdsvnldvnsjnjvsdnjsvnlksdvlnvsdlnslnkvlnsvdnklskvsddsnlknkldvnkldsvdvlnknlnjjdsvnldvnsjnjvsdnjsvnlksdvlnvsdlnslnkvlnsvdnklskvsddsnlknkldvnkldsvdvlnknlnj
        </p>
      </section>
    </main>
  );
};
