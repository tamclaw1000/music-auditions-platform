# Music Auditions Platform Requirements

## 1. Product summary

Build a cross-platform audition submission product that supports:
- musicians discovering and applying to opportunities,
- organizations publishing submission requirements and managing applicants,
- web and mobile execution of the full workflow.

## 2. Primary user roles

### Musicians
- Create and manage profile
- Discover organizations and active opportunities
- Submit one or more audition assets per application
- Track status and communications

### Organization administrators
- Register organization accounts
- Create one or more audition programs/opportunities
- Define submission requirements and deadlines
- Review, score, and update applicant status

### Reviewers
- Review assigned submissions
- Score and comment on applications
- Participate in shortlist and callback decisions

## 3. Functional requirements

### 3.1 Authentication and accounts
- Support musician and organization account creation
- Support invitation-based multi-admin organization accounts
- Support password reset and email verification
- Support profile editing on web and mobile

### 3.2 Musician experience
- Create reusable profile with:
  - legal/preferred name
  - instruments/voice type
  - age or DOB controls where required
  - biography
  - resume/CV
  - media links
  - profile photo
- Browse organizations and opportunities
- Filter by instrument, genre, age band, location, deadline, and remote/in-person
- Save draft applications
- Submit multiple audition files per application
- Attach metadata to each file:
  - title
  - composer
  - duration
  - notes
- Validate against organization rules before submission
- View submission history and statuses

### 3.3 Organization experience
- Register organization profile with branding and contact details
- Publish opportunities with:
  - title
  - description
  - eligibility
  - required materials
  - accepted media formats
  - minimum/maximum number of audition submissions
  - application deadline
  - review rubric
- View dashboard of applicants and deadlines
- Assign reviewers
- Score, comment, shortlist, and update statuses
- Export submissions for offline review if needed

### 3.4 Mobile requirements
- All core flows available on iPhone and Android
- Mobile upload flow for one or more audition files
- Mobile-friendly progress saving for interrupted submissions
- Push notifications for status changes and deadlines

### 3.5 Administrative/reporting requirements
- Track application counts, completion rates, and review progress
- Audit important status changes
- Maintain media retention and privacy controls

## 4. Non-functional requirements
- Responsive web UI
- Native-quality mobile UX using a shared product model
- Secure media upload and access controls
- Scalable storage for video/audio files
- Accessibility baseline for forms and review flows
- Reasonable performance on mobile networks

## 5. MVP scope
- Musician registration and profile
- Organization registration and opportunity publishing
- Opportunity browsing and filtering
- Multi-file audition submission
- Reviewer dashboard with scoring/comments
- Status updates and notifications
- iPhone + Android app using shared APIs

## 6. Post-MVP ideas
- Payment collection for application fees
- Calendar scheduling for callbacks
- AI-assisted media quality checks
- Blind-review mode
- Recommendation and matching engine
