import React from "react";
import { trackPageview, trackEvent } from "./api/analytics";
import Image from "next/image";

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <>
      <h1>Check out the Blinkist app</h1>

      <Image
        width={525}
        height={275.5}
        src="/hero_image.jpg"
        alt="Check out the Blinkist app"
      />

      <div>
        {/* Control variation */}
        Meet the app that revolutionized reading.
      </div>

      <div>
        {/* Test variation  */}
        Meet the app that has 18 million users.
      </div>

      <div>
        Thanks a lot for reading the article! <a href="/signup">SIGN UP</a> for
        Blinkist.
      </div>
    </>
  );
};

export default HomePage;
