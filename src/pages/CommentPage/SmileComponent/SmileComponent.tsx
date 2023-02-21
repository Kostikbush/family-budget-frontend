import "./smile.scss";
interface smileProps {
  active?: "angry" | "sad" | "ok" | "good" | "happy";
  setActiveSmile?: Function;
}
export const SmileComponent = ({ active, setActiveSmile }: smileProps) => {
  if (active === "angry") {
    return (
      <section>
        <div className="feedback">
          <label className="angry">
            <input checked type="checkbox" value="1" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  } else if (active === "sad") {
    return (
      <section>
        <div className="feedback">
          <label className="sad">
            <input readOnly checked type="checkbox" value="2" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  } else if (active === "ok") {
    return (
      <section>
        <div className="feedback">
          <label className="ok">
            <input readOnly checked type="checkbox" value="3" name="feedback" />
            <div></div>
          </label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  } else if (active === "good") {
    return (
      <section>
        <div className="feedback">
          <label className="good">
            <input readOnly checked type="checkbox" value="4" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  } else if (active === "happy") {
    return (
      <section>
        <div className="feedback">
          <label className="happy">
            <input readOnly checked type="checkbox" value="5" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
            </div>
          </label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  } else if (setActiveSmile) {
    return (
      <section>
        <div className="feedback">
          <label onClick={() => setActiveSmile("angry")} className="angry">
            <input type="radio" value="1" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
          <label onClick={() => setActiveSmile("sad")} className="sad">
            <input type="radio" value="2" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
          <label onClick={() => setActiveSmile("ok")} className="ok">
            <input type="radio" value="3" name="feedback" />
            <div></div>
          </label>
          <label onClick={() => setActiveSmile("good")} className="good">
            <input type="radio" value="4" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="mouth">
                <use xlinkHref="#mouth" />
              </svg>
            </div>
          </label>
          <label onClick={() => setActiveSmile("happy")} className="happy">
            <input type="radio" value="5" name="feedback" />
            <div>
              <svg className="eye left">
                <use xlinkHref="#eye" />
              </svg>
              <svg className="eye right">
                <use xlinkHref="#eye" />
              </svg>
            </div>
          </label>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
            <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 7"
            id="mouth"
          >
            <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
        </svg>
      </section>
    );
  }
  return <div></div>;
};
