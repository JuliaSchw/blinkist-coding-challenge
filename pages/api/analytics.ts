export const trackPageview = async (userId: string, variation: string) => {
  try {
    const response = await fetch("/api/pageview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        variation,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Pageview tracked successfully.");
  } catch (error) {
    console.error("Error tracking pageview:", error);
  }
};

export const trackEvent = async (userId: string, variation: string) => {
  try {
    const response = await fetch("/api/click", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        variation,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Event tracked successfully.");
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
