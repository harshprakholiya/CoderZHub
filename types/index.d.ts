import { BADGE_CRITERIA } from "@/constants";


export interface SidebarLink {
    imgURL: string;
    route: string;
    label: string;
  }

  export interface BadgeCounts {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
  }
  
  export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;