import type { Opportunity } from './types';

export const musicianWorkflow = [
  {
    title: 'Build one reusable profile',
    description: 'Save your instrument, bio, location, resume links, and contact details once, then reuse them across applications.'
  },
  {
    title: 'Browse open opportunities',
    description: 'Filter by organization, instrument family, genre, location, or deadline to find the right fit quickly.'
  },
  {
    title: 'Submit multiple audition pieces',
    description: 'Add one or more audition entries with title, composer, duration, link, and notes before sending the full package.'
  },
  {
    title: 'Track your status',
    description: 'See whether each application is draft, submitted, under review, shortlisted, accepted, or declined.'
  }
] as const;

export const organizationWorkflow = [
  {
    title: 'Register your organization',
    description: 'Set up administrators, contact information, and a branded opportunity page for prospective musicians.'
  },
  {
    title: 'Publish clear requirements',
    description: 'Define eligibility, deadlines, material rules, accepted formats, and the minimum/maximum number of audition submissions.'
  },
  {
    title: 'Review applications efficiently',
    description: 'Inspect applicant profiles and audition entries in one place, then shortlist candidates for callbacks.'
  },
  {
    title: 'Manage communication',
    description: 'Keep musicians informed with status updates and next-step messaging throughout the review cycle.'
  }
] as const;

export const featuredOrganizations: Opportunity[] = [
  {
    id: 'north-lake-youth-symphony',
    organizationName: 'North Lake Youth Symphony',
    title: '2026 Season Auditions',
    location: 'Chicago, IL',
    deadline: '2026-07-15',
    genre: 'Youth orchestra',
    instrumentFocus: ['Violin', 'Viola', 'Cello', 'Bass', 'Woodwinds'],
    auditionCountMin: 2,
    auditionCountMax: 3,
    description: 'Seasonal orchestral auditions for youth musicians with contrasting repertoire and excerpt requirements.',
    requirements: ['2 contrasting video submissions', 'resume', 'guardian contact if under 18']
  },
  {
    id: 'crescendo-opera-studio',
    organizationName: 'Crescendo Opera Studio',
    title: 'Emerging Vocalist Intake',
    location: 'Remote + New York, NY',
    deadline: '2026-08-01',
    genre: 'Opera',
    instrumentFocus: ['Soprano', 'Mezzo-Soprano', 'Tenor', 'Baritone', 'Bass'],
    auditionCountMin: 1,
    auditionCountMax: 2,
    description: 'Emerging vocalist intake with aria recording, spoken introduction, and language experience.',
    requirements: ['1 aria', '1 spoken introduction', 'headshot']
  },
  {
    id: 'pulse-contemporary-ensemble',
    organizationName: 'Pulse Contemporary Ensemble',
    title: 'Project-Based Call for Artists',
    location: 'Austin, TX',
    deadline: '2026-06-20',
    genre: 'Contemporary / experimental',
    instrumentFocus: ['Multi-instrumentalist', 'Piano', 'Percussion', 'Electronics'],
    auditionCountMin: 2,
    auditionCountMax: 4,
    description: 'A flexible call for musicians comfortable with contemporary repertoire and collaborative development.',
    requirements: ['portfolio link', '2 samples', 'availability form']
  }
] as const;
