import React from "react";
import { trackPageview, trackEvent } from "./api/analytics";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = (props) => {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const savedVersion = localStorage.getItem("version");

    if (savedVersion) {
      setVersion(savedVersion);
    } else {
      const newVersion = Math.random() < 0.5 ? "control" : "test";
      localStorage.setItem("version", newVersion);
      setVersion(newVersion);
    }
    if (version) {
      trackPageview({ url: window.location.pathname, version: version });
    }
  }, [version]);

  return (
    <>
      <h1>Check out the Blinkist app</h1>

      <Image
        width={525}
        height={275.5}
        src="/hero_image.jpg"
        alt="Check out the Blinkist app"
      />

      {version === "control" ? (
        <div>Meet the app that revolutionized reading.</div>
      ) : (
        <div>Meet the app that has 18 million users.</div>
      )}

      <div>
        Thanks a lot for reading the article! <Link href="/">SIGN UP</Link> for
        Blinkist.
      </div>
    </>
  );
};

export default HomePage;
