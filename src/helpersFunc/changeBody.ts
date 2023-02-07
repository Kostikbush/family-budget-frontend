import { ChangeBgPages } from "../CONST/CONST";

export const changeBody = (string: string) => {
  if (string === ChangeBgPages.HOME) {
    document.body.style.cssText = `background: linear-gradient(
                    -45deg,
                    #9d703525,
                    #b2803f25,
                    #c4893b25,
                    #d0934425
                  );
                  transition: 0.3s all;
                  `;
  }
  if (string === ChangeBgPages.LOGIN) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #44146955,
                #6a023355,
                #79198855,
                #4b095f55
              );
              transition: 0.3s all;
              `;
  }
  if (string === "") {
    document.body.style.cssText = `background: linear-gradient(
      -45deg,
      #fff05,
      #fff05,
      #fff05,
      #fff05
    );
    transition: 0.3s all;
    `;
  }

  if (string === ChangeBgPages.STAT) {
    document.body.style.cssText = `background: linear-gradient(
              -45deg,
              #b387de25,
              #7740ad25,
              #5f2d9125,
              #6427a025
            );
            transition: 0.3s all;
            `;
  }
  if (string === ChangeBgPages.AIM) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #de878725,
                #a5373725,
                #ea292925,
                #de878725
              );
              transition: 0.3s all;
              `;
  }
  if (string === ChangeBgPages.INCOM) {
    document.body.style.cssText = `background: linear-gradient(
              -45deg,
              #00a92a25,
              #00a92a25,
              #00a92a25,
              #00a92a25
            );
            transition: 0.3s all;
            `;
  }
  if (string === ChangeBgPages.EXPENS) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #00338525,
                #00338525,
                #00338525,
                #00338525
              );
              transition: 0.3s all;
              `;
  }
  if (string === ChangeBgPages.CHAT) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #de87dd25,
                #de87dd25,
                #de87dd25,
                #de87dd25
              );
              transition: 0.3s all;
              `;
  }
  if (string === ChangeBgPages.ACCOUNT) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #a887de25,
                #a887de25,
                #a887de25,
                #a887de25
              );
              transition: 0.3s all;
              `;
  }
  if (string === ChangeBgPages.CREATE_BUDGET) {
    document.body.style.cssText = `background: linear-gradient(
                -45deg,
                #87d1de25,
               #87d1de25,
               #87d1de25,
                #87d1de25,
              );
              transition: 0.3s all;
              `;
  }
};
