export const musicianWorkflow = [
  {
    title: 'Create a musician profile',
    description: 'Build one reusable profile with bio, instruments, repertoire, resume, and media links.'
  },
  {
    title: 'Browse published opportunities',
    description: 'Search by organization, instrument, age range, deadline, location, and audition format.'
  },
  {
    title: 'Submit one or more auditions',
    description: 'Upload multiple pieces, label each recording, attach notes, and validate that every requirement is satisfied before submission.'
  },
  {
    title: 'Track status and next steps',
    description: 'Receive updates for incomplete, under review, shortlisted, waitlisted, accepted, or declined outcomes.'
  }
] as const;

export const organizationWorkflow = [
  {
    title: 'Register an organization',
    description: 'Create an organization workspace with administrators, contact details, branding, and review settings.'
  },
  {
    title: 'Publish submission requirements',
    description: 'Define programs, eligibility, required documents, required audition count, media format rules, and deadlines.'
  },
  {
    title: 'Review and shortlist applicants',
    description: 'Filter by instrument, score auditions, leave comments, collaborate internally, and export candidate lists.'
  },
  {
    title: 'Communicate decisions',
    description: 'Send status updates, requests for more material, callback invitations, and acceptance decisions.'
  }
] as const;

export const featuredOrganizations = [
  {
    name: 'North Lake Youth Symphony',
    summary: 'Seasonal orchestral auditions for strings, winds, brass, and percussion with two required contrasting excerpts.',
    requirements: ['2 video submissions', 'resume', 'guardian contact if under 18']
  },
  {
    name: 'Crescendo Opera Studio',
    summary: 'Emerging vocalist intake with aria recording, language skills, and performance history.',
    requirements: ['1 aria', '1 spoken introduction', 'headshot']
  },
  {
    name: 'Pulse Contemporary Ensemble',
    summary: 'Project-based call for multi-instrumentalists interested in contemporary and experimental repertoire.',
    requirements: ['portfolio link', '2 samples', 'availability form']
  }
] as const;
