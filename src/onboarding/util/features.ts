export type Feature = {
  title: string;
  content: string;
  image: any;
};

export const features: Feature[] = [
  {
    title: 'Fast messaging',
    content:
      'Text without corcerns thanks to awesome of engineers we have achieved high speeds',
    image: require('../ui/assets/messages.png'),
  },
  {
    title: 'Find awesome people',
    content:
      "Explore our cyber space in look for awesome people, the odds are you'll find someone like you. ",
    image: require('../ui/assets/content-space.png'),
  },
  {
    title: 'Stay in sync',
    content:
      'You can keep all your devices synchronized, your phone, your computer and more!!!',
    image: require('../ui/assets/sync.png'),
  },
  {
    title: 'Join us today',
    content: "It's free and it only takes a couple of seconds!!!",
    image: require('../ui/assets/celebration.png'),
  },
];
