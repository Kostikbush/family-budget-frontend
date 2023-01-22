import { useState } from "react";

export const HomePage = () => {
  const [isExitMainPage, setIsExitMainPage] = useState(false);
  return (
    <main className={isExitMainPage ? "page-exit" : "page-enter"}>
      <h1>Home Page</h1>
    </main>
  );
};
