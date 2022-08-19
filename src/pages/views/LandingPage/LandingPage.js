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
                  Recycle today for a{" "}
                  <span style={{color: mainColor}}>better tomorrow</span>
                </h4>
                <p style={{ fontSize: 25 }} className="mt-5 font-weight-bold">
                  Recycle, Recycle, it's not hard to do, you can reduce
                  pollution and help the world too.
                </p>
                <GetStartedBtn to="/quiz" className="mt-5">
                  Get Started
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
