import { Article } from "../lib/definition";

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    author: 'Author 1',
    date: '2023-01-01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dimas_ardiminda_edia_putra_BOEQ0iu.jpg",

    },
  {
    id: '2',
    title: 'Article 2',
    author: 'Author 2',
    date: '2023-01-02',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: "https://example.com/webdev-article.jpg",

  },
  {
    id: '3',
    title: 'Article 3',
    author: 'Author 3',
    date: '2023-01-03',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: "https://example.com/webdev-article.jpg",
  },
  

];

export { ARTICLES };