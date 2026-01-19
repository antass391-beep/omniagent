
export const inGoogleAISandbox = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};
