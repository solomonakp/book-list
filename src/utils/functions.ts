import { Authors, Books, NotificationSettingsType } from 'types';

export const createOptions = (authors: Authors) => {
  const options = authors.map(({ name, id }) => {
    return { label: name, value: id };
  });

  return options;
};

export const filterBooksByTitle = (books: Books, currentBookTitle: string) => {
  const filteredBooksByTitle = books.filter(({ title }) => {
    return title !== currentBookTitle;
  });

  return filteredBooksByTitle;
};

export const notificationSettings = {
  container: 'top-right',
  animationIn: ['animated', 'flipInY'],
  animationOut: ['animated', 'flipOutY'],
  dismiss: {
    duration: 5000,
    onScreen: false,
    pauseOnHover: true,
    showIcon: true,
  },
  slidingExit: {
    duration: 200,
    timingFunction: 'ease-out',
    delay: 0,
  },
  slidingEnter: {
    duration: 200,
    timingFunction: 'ease-in',
    delay: 0,
  },
  touchSlidingExit: {
    swipe: {
      duration: 200,
      timingFunction: 'ease-in-out',
      delay: 0,
    },
    fade: {
      duration: 200,
      timingFunction: 'ease-in-out',
      delay: 0,
    },
  },
};
