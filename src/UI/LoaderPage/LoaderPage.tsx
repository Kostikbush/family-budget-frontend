import "./loaderPage.scss";
export const LoaderPage = () => {
  return (
    <article className="app__wrapper-loader">
      <div className="app__lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </article>
  );
};
