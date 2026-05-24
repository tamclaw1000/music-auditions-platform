import organizationsJson from '../../../../data/demo-1000/organizations.json';
import auditionEventsJson from '../../../../data/demo-1000/audition-events.json';
import type { AuditionEvent, Organization } from '@shared/types';

export function listOrganizations(): Organization[] {
  return organizationsJson as Organization[];
}

export function listAuditionEvents(): AuditionEvent[] {
  return auditionEventsJson as AuditionEvent[];
}

export function getOrganizationById(id: string): Organization | undefined {
  return listOrganizations().find((org) => org.id === id);
}

export function getOrganizationEvents(organizationId: string): AuditionEvent[] {
  return listAuditionEvents().filter((event) => event.organizationId === organizationId);
}

export function getHomePageFeaturedEvents(limit = 3): AuditionEvent[] {
  return listAuditionEvents().slice(0, limit);
}
