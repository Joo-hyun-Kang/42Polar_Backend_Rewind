import { MentorsListElement } from './mentors-list-element.interface';

export interface MentorsListByCategory {
  categoryName: string;
  mentorCount: number;
  mentors: MentorsListElement[];
}
