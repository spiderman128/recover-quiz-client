import React from "react";
import { GetStartedBtn, LandingBackground } from "./Styles";
import { mainColor, darkColor } from "../../../utils/constant";

function LandingPage() {
  return (
    <LandingBackground>
      <section className="container" style={{ height: "100%" }}>
        <div className="row align-items-center" style={{ height: "100%" }}>
          <div className="col-md-6">
            <div className="recycle-text-part p-4">
              <div className="recycle-slogan">
                <h4 className="display-4 font-weight-bold" style={{color: darkColor}}>
                  Vuoi sapere quanto è{" "}
                  <span style={{color: mainColor}}>green la tua azienda?</span>
                </h4>
                <p style={{ fontSize: 25 }} className="mt-5 font-weight-bold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ante mi, hendrerit sit amet lacinia at, lobortis nec felis.
                </p>
                <GetStartedBtn to="/quiz" className="mt-5">
                  Fai il test
                </GetStartedBtn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingBackground>
  );
}

export default LandingPage;
