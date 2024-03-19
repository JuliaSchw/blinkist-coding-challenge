// Define an interface for the Pageview parameters
interface PageviewParams {
    url: string;
    // Add any other parameters you think might be valuable
  }
  
  // Define an interface for the Event tracking parameters
  interface EventParams {
    url: string;
    eventName: string;
    // Add any other parameters you think might be valuable
  }
  
  /**
   * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
   * Send as params whatever you might seem valuable to send.
   * The URL is probably a good start though.
   */
  export const trackPageview = (params: PageviewParams) => {
    console.log(`--> Tracking Pageview: ${JSON.stringify(params)}`);
  };
  
  /**
   * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
   * Send as params whatever you might seem valuable to send.
   * The URL and an event name are probably a good start though.
   */
  export const trackEvent = (params: EventParams) => {
    console.log(`--> Tracking Event: ${JSON.stringify(params)}`);
  };
  