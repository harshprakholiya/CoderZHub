import { SidebarLink } from "@/types";



// we can add more themes here
export const themes = [
  {
    value: "light",
    label: "Light",
    activeIcon: "/assets/icons/sun.svg",
    lightIcon: "/assets/icons/sun-dark-100.svg",
    darkIcon: "/assets/icons/sun-dark-400.svg",
  },
  {
    value: "dark",
    label: "Dark",
    activeIcon: "/assets/icons/moon.svg",
    lightIcon: "/assets/icons/moon-dark-100.svg",
    darkIcon: "/assets/icons/moon-dark-400.svg",
  },
  {
    value: "system",
    label: "System",
    activeIcon: "/assets/icons/system.svg",
    lightIcon: "/assets/icons/system-dark-100.svg",
    darkIcon: "/assets/icons/system-dark-400.svg",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  // {
  //   imgURL: "/assets/icons/suitcase.svg",
  //   route: "/jobs",
  //   label: "Find Jobs",
  // },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
  {
    imgURL: "/assets/icons/stars-white-2.svg",
    route: "/ask-ai",
    label: "Ask AI",
  },
];


export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

