import React, { useEffect, useState } from "react";
import Image from "next/image";
import { trackPageview, trackEvent } from "./api/analytics";
import { v4 as uuidv4 } from "uuid";
import CtrDisplay from "./../components/ctr/index";

const getVariation = () => {
  const savedVariation = localStorage.getItem("variation");
  if (savedVariation) return savedVariation;

  const variation = Math.random() < 0.5 ? "control" : "test";
  localStorage.setItem("variation", variation);
  return variation;
};

const HomePage: React.FC<{}> = () => {
  const [variation, setVariation] = useState("control");

  useEffect(() => {
    const userId = getUserId();
    const assignedVariation = getVariation();
    setVariation(assignedVariation);
    trackPageview(userId, assignedVariation);
  }, []);

  const handleSignUpClick = () => {
    const userId = getUserId();
    trackEvent(userId, variation);
  };

  function getUserId() {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    return userId;
  }

  return (
    <>
      <h1>Check out the Blinkist app</h1>
      <Image
        width={300}
        height={200}
        src="/hero_image.jpg"
        alt="Check out the Blinkist app"
      />
      {variation === "control" ? (
        <div>Meet the app that revolutionized reading.</div>
      ) : (
        <div>Meet the app that has 18 million users.</div>
      )}
      <div>
        Thanks a lot for reading the article!
        <a href="#" onClick={handleSignUpClick}>
          SIGN UP
        </a>
        for Blinkist.
      </div>
      <CtrDisplay></CtrDisplay>
    </>
  );
};

export default HomePage;
