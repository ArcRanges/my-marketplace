import bugsnag from "@bugsnag/expo";

const start = () => bugsnag.start();

const notify = (error) => bugsnag.notify(error);

export default {
  start,
  notify,
};
