export type Opportunity = {
  id: string;
  organizationName: string;
  title: string;
  location: string;
  deadline: string;
  genre: string;
  instrumentFocus: string[];
  auditionCountMin: number;
  auditionCountMax: number;
  description: string;
  requirements: string[];
};

export type SubmissionEntry = {
  id: string;
  pieceTitle: string;
  composer: string;
  duration: string;
  link: string;
  notes: string;
};

export type MusicianProfile = {
  fullName: string;
  email: string;
  primaryInstrument: string;
  city: string;
  bio: string;
};

export type OrganizationDraft = {
  organizationName: string;
  contactName: string;
  email: string;
  programTitle: string;
  deadline: string;
  requirementsText: string;
};
