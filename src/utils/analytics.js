import ReactGA from 'react-ga';

export const initGA = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(config.GOOGLE_ANALYTICS);
  } else {
    console.info('[GA] Init');
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.hash });
    ReactGA.pageview(window.location.hash);
  } else {
    console.info(`[GA] Page view: ${window.location.hash}`);
  }
};

export const logEvent = (category = '', action = '', label = '') => {
  if (process.env.NODE_ENV === 'production') {
    if (category && action) {
      ReactGA.event({
        category,
        action,
        ...!!label && { label }
      });
    }
  } else {
    console.info(`[GA] Event: ${category}, ${action}, ${label}`);
  }
};
