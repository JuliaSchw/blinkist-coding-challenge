import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { trackPageview, trackEvent } from "./api/analytics";
import { v4 as uuidv4 } from "uuid";

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
    const variation = getVariation();
    trackPageview(`URL - Variation: ${variation} - UserID: ${userId}`);
  }, []);

  const handleSignUpClick = () => {
    const userId = getUserId();
    trackEvent(
      `URL - SignUp Click - Variation: ${variation} - UserID: ${userId}`
    );
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
        height={300}
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
        <Link href="/" onClick={handleSignUpClick}>
          SIGN UP
        </Link>
        for Blinkist.
      </div>
    </>
  );
};

export default HomePage;
