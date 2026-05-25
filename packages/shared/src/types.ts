export type Organization = {
  id: string;
  name: string;
  location: string;
  type: string;
  summary: string;
  contactEmail: string;
  website: string;
};

export type AuditionEvent = {
  id: string;
  organizationId: string;
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

export type Opportunity = AuditionEvent;

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

export type MusicianRegistrationStatus = 'registered' | 'uploading' | 'ready';

export type MusicianRegistration = {
  auditionEventId: string;
  registeredAt: string;
  status: MusicianRegistrationStatus;
  tapes: SubmissionEntry[];
};

export type DemoMusicianAccount = {
  id: string;
  email: string;
  passwordHint: string;
  stageLabel: string;
  profile: MusicianProfile;
  registrations: MusicianRegistration[];
};

export type OrganizationDraft = {
  organizationName: string;
  contactName: string;
  email: string;
  programTitle: string;
  deadline: string;
  requirementsText: string;
};
