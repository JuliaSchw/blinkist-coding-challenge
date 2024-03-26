export const trackClick = async (userId: string, variation: string) => {
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
    console.log("Click tracked successfully.");
  } catch (error) {
    console.error("Error tracking click:", error);
  }
};
