import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { featuredOrganizations, musicianWorkflow, organizationWorkflow } from '../../../packages/shared/src/content';
import type { MusicianProfile, OrganizationDraft, Opportunity, SubmissionEntry } from '../../../packages/shared/src/types';

const palette = {
  bg: '#07111f',
  panel: '#0f1b2d',
  panel2: '#13243b',
  text: '#eef4ff',
  muted: '#a9b7cf',
  accent: '#87d7ff',
  accentSoft: 'rgba(135,215,255,0.14)',
  accent2: '#ffd66b',
  good: '#8df0c8',
  border: 'rgba(255,255,255,0.10)',
  danger: '#ff9fa7',
};

type Mode = 'overview' | 'musician' | 'organization';

const emptyProfile: MusicianProfile = {
  fullName: '',
  email: '',
  primaryInstrument: '',
  city: '',
  bio: '',
};

const emptyOrgDraft: OrganizationDraft = {
  organizationName: '',
  contactName: '',
  email: '',
  programTitle: '',
  deadline: '',
  requirementsText: '',
};

function makeSubmissionEntry(): SubmissionEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    pieceTitle: '',
    composer: '',
    duration: '',
    link: '',
    notes: '',
  };
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline ? styles.textarea : null]}
      />
    </View>
  );
}

export default function HomeScreen() {
  const [mode, setMode] = useState<Mode>('overview');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(featuredOrganizations[0]?.id ?? '');
  const [profile, setProfile] = useState<MusicianProfile>(emptyProfile);
  const [orgDraft, setOrgDraft] = useState<OrganizationDraft>(emptyOrgDraft);
  const [submissions, setSubmissions] = useState<SubmissionEntry[]>([makeSubmissionEntry()]);
  const [preparedMessage, setPreparedMessage] = useState('');

  const selectedOpportunity = useMemo<Opportunity | undefined>(
    () => featuredOrganizations.find((item) => item.id === selectedOpportunityId),
    [selectedOpportunityId]
  );

  const profileComplete = Object.values(profile).every((value) => value.trim().length > 0);
  const submissionFieldsComplete = submissions.every(
    (entry) => entry.pieceTitle.trim() && entry.composer.trim() && entry.duration.trim() && entry.link.trim()
  );
  const submissionCountValid = selectedOpportunity
    ? submissions.length >= selectedOpportunity.auditionCountMin && submissions.length <= selectedOpportunity.auditionCountMax
    : false;
  const applicationReady = Boolean(selectedOpportunity && profileComplete && submissionFieldsComplete && submissionCountValid);

  function updateSubmission(id: string, field: keyof SubmissionEntry, value: string) {
    setSubmissions((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  }

  function removeSubmission(id: string) {
    setSubmissions((current) => (current.length > 1 ? current.filter((entry) => entry.id !== id) : current));
  }

  function prepareApplication() {
    if (!applicationReady || !selectedOpportunity) return;
    setPreparedMessage(
      `Ready for ${selectedOpportunity.organizationName}: ${submissions.length} audition ${submissions.length === 1 ? 'entry' : 'entries'} prepared.`
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <SectionCard>
        <Text style={styles.kicker}>PRIMARY MOBILE FRONT END</Text>
        <Text style={styles.heroTitle}>Music submissions built for iPhone and Android first.</Text>
        <Text style={styles.body}>
          Shared React Native screens now mirror the website’s core flows. Expo keeps one codebase for both platforms and gives us a clean path to camera capture, local media handling, and future resumable video uploads.
        </Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Expo React Native</Text>
          <Text style={styles.badge}>Shared product model</Text>
          <Text style={styles.badge}>Future video capture ready</Text>
        </View>
      </SectionCard>

      <View style={styles.segmentRow}>
        {(['overview', 'musician', 'organization'] as Mode[]).map((item) => (
          <Pressable
            key={item}
            onPress={() => setMode(item)}
            style={[styles.segment, mode === item ? styles.segmentActive : null]}
          >
            <Text style={[styles.segmentText, mode === item ? styles.segmentTextActive : null]}>
              {item === 'overview' ? 'Overview' : item === 'musician' ? 'Musician' : 'Organization'}
            </Text>
          </Pressable>
        ))}
      </View>

      {mode === 'overview' ? (
        <>
          <SectionCard>
            <Text style={styles.sectionTitle}>Musician flow</Text>
            {musicianWorkflow.map((step) => (
              <View key={step.title} style={styles.flowItem}>
                <Text style={styles.flowTitle}>{step.title}</Text>
                <Text style={styles.body}>{step.description}</Text>
              </View>
            ))}
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Organization flow</Text>
            {organizationWorkflow.map((step) => (
              <View key={step.title} style={styles.flowItem}>
                <Text style={styles.flowTitle}>{step.title}</Text>
                <Text style={styles.body}>{step.description}</Text>
              </View>
            ))}
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Opportunities on the phone</Text>
            {featuredOrganizations.map((opportunity) => (
              <View key={opportunity.id} style={styles.listItem}>
                <Text style={styles.flowTitle}>{opportunity.organizationName}</Text>
                <Text style={styles.muted}>{opportunity.title}</Text>
                <Text style={styles.body}>{opportunity.description}</Text>
                <Text style={styles.microMeta}>
                  {opportunity.location} · deadline {opportunity.deadline} · {opportunity.auditionCountMin}-{opportunity.auditionCountMax} audition(s)
                </Text>
              </View>
            ))}
          </SectionCard>
        </>
      ) : null}

      {mode === 'musician' ? (
        <>
          <SectionCard>
            <Text style={styles.sectionTitle}>Browse opportunities</Text>
            {featuredOrganizations.map((opportunity) => {
              const selected = opportunity.id === selectedOpportunityId;
              return (
                <Pressable
                  key={opportunity.id}
                  onPress={() => setSelectedOpportunityId(opportunity.id)}
                  style={[styles.selectorCard, selected ? styles.selectorCardActive : null]}
                >
                  <Text style={styles.flowTitle}>{opportunity.organizationName}</Text>
                  <Text style={styles.muted}>{opportunity.title}</Text>
                  <Text style={styles.microMeta}>{opportunity.location} · deadline {opportunity.deadline}</Text>
                </Pressable>
              );
            })}
          </SectionCard>

          {selectedOpportunity ? (
            <SectionCard>
              <Text style={styles.sectionTitle}>Selected requirements</Text>
              <Text style={styles.flowTitle}>{selectedOpportunity.title}</Text>
              <Text style={styles.body}>{selectedOpportunity.description}</Text>
              <Text style={styles.microMeta}>
                Needs {selectedOpportunity.auditionCountMin}-{selectedOpportunity.auditionCountMax} audition submission(s)
              </Text>
              <View style={styles.badgeRow}>
                {selectedOpportunity.requirements.map((requirement) => (
                  <Text key={requirement} style={styles.badge}>{requirement}</Text>
                ))}
              </View>
            </SectionCard>
          ) : null}

          <SectionCard>
            <Text style={styles.sectionTitle}>Musician profile</Text>
            <LabeledInput label="Full name" value={profile.fullName} onChangeText={(value) => setProfile({ ...profile, fullName: value })} />
            <LabeledInput label="Email" value={profile.email} onChangeText={(value) => setProfile({ ...profile, email: value })} />
            <LabeledInput label="Primary instrument / voice" value={profile.primaryInstrument} onChangeText={(value) => setProfile({ ...profile, primaryInstrument: value })} />
            <LabeledInput label="City" value={profile.city} onChangeText={(value) => setProfile({ ...profile, city: value })} />
            <LabeledInput label="Bio" value={profile.bio} onChangeText={(value) => setProfile({ ...profile, bio: value })} multiline />
          </SectionCard>

          <SectionCard>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Audition entries</Text>
              <Pressable style={styles.secondaryButton} onPress={() => setSubmissions((current) => [...current, makeSubmissionEntry()])}>
                <Text style={styles.secondaryButtonText}>Add</Text>
              </Pressable>
            </View>

            {submissions.map((entry, index) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.flowTitle}>Audition #{index + 1}</Text>
                  {submissions.length > 1 ? (
                    <Pressable onPress={() => removeSubmission(entry.id)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  ) : null}
                </View>
                <LabeledInput label="Piece title" value={entry.pieceTitle} onChangeText={(value) => updateSubmission(entry.id, 'pieceTitle', value)} />
                <LabeledInput label="Composer" value={entry.composer} onChangeText={(value) => updateSubmission(entry.id, 'composer', value)} />
                <LabeledInput label="Duration" value={entry.duration} onChangeText={(value) => updateSubmission(entry.id, 'duration', value)} placeholder="04:25" />
                <LabeledInput label="Media link" value={entry.link} onChangeText={(value) => updateSubmission(entry.id, 'link', value)} placeholder="https://..." />
                <LabeledInput label="Notes" value={entry.notes} onChangeText={(value) => updateSubmission(entry.id, 'notes', value)} multiline />
              </View>
            ))}

            <View style={styles.statusWrap}>
              <Text style={[styles.statusText, profileComplete ? styles.good : styles.warn]}>
                {profileComplete ? 'Profile complete' : 'Complete the profile'}
              </Text>
              <Text style={[styles.statusText, submissionFieldsComplete ? styles.good : styles.warn]}>
                {submissionFieldsComplete ? 'Audition entries complete' : 'Fill required audition fields'}
              </Text>
              <Text style={[styles.statusText, submissionCountValid ? styles.good : styles.warn]}>
                {submissionCountValid ? 'Audition count valid' : 'Adjust audition count for this opportunity'}
              </Text>
            </View>

            <Pressable
              onPress={prepareApplication}
              style={[styles.primaryButton, !applicationReady ? styles.primaryButtonDisabled : null]}
              disabled={!applicationReady}
            >
              <Text style={styles.primaryButtonText}>Prepare application</Text>
            </Pressable>

            {preparedMessage ? <Text style={styles.successText}>{preparedMessage}</Text> : null}
          </SectionCard>
        </>
      ) : null}

      {mode === 'organization' ? (
        <>
          <SectionCard>
            <Text style={styles.sectionTitle}>Organization registration</Text>
            <LabeledInput label="Organization name" value={orgDraft.organizationName} onChangeText={(value) => setOrgDraft({ ...orgDraft, organizationName: value })} />
            <LabeledInput label="Contact name" value={orgDraft.contactName} onChangeText={(value) => setOrgDraft({ ...orgDraft, contactName: value })} />
            <LabeledInput label="Email" value={orgDraft.email} onChangeText={(value) => setOrgDraft({ ...orgDraft, email: value })} />
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Publish requirement draft</Text>
            <LabeledInput label="Program title" value={orgDraft.programTitle} onChangeText={(value) => setOrgDraft({ ...orgDraft, programTitle: value })} />
            <LabeledInput label="Deadline" value={orgDraft.deadline} onChangeText={(value) => setOrgDraft({ ...orgDraft, deadline: value })} placeholder="YYYY-MM-DD" />
            <LabeledInput label="Requirements" value={orgDraft.requirementsText} onChangeText={(value) => setOrgDraft({ ...orgDraft, requirementsText: value })} multiline />
          </SectionCard>

          <SectionCard>
            <Text style={styles.sectionTitle}>Draft preview</Text>
            <Text style={styles.flowTitle}>{orgDraft.organizationName || 'Your organization'}</Text>
            <Text style={styles.muted}>{orgDraft.programTitle || 'Opportunity title'}</Text>
            <Text style={styles.microMeta}>deadline {orgDraft.deadline || 'TBD'}</Text>
            <Text style={styles.body}>{orgDraft.requirementsText || 'Requirements will appear here as you draft them.'}</Text>
            <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>Technology note</Text>
              <Text style={styles.body}>
                Expo is intentionally chosen so the next iteration can add native-feeling video capture and upload using Expo camera/media modules plus resumable upload flows without splitting into separate iOS and Android codebases.
              </Text>
            </View>
          </SectionCard>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 16,
  },
  card: {
    backgroundColor: palette.panel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 18,
    gap: 12,
  },
  kicker: {
    color: palette.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  heroTitle: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '800',
  },
  flowTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    color: palette.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  muted: {
    color: palette.muted,
    fontSize: 14,
  },
  microMeta: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    backgroundColor: palette.panel,
  },
  segmentActive: {
    backgroundColor: palette.accentSoft,
    borderColor: palette.accent,
  },
  segmentText: {
    color: palette.muted,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: palette.text,
  },
  flowItem: {
    borderRadius: 16,
    backgroundColor: palette.panel2,
    padding: 14,
    gap: 6,
  },
  listItem: {
    borderRadius: 16,
    backgroundColor: palette.panel2,
    padding: 14,
    gap: 6,
  },
  selectorCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel2,
    padding: 14,
    gap: 4,
  },
  selectorCardActive: {
    borderColor: palette.accent,
    backgroundColor: palette.accentSoft,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    color: palette.accent,
    backgroundColor: palette.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '600',
  },
  fieldWrap: {
    gap: 8,
  },
  label: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: palette.bg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.text,
    fontSize: 15,
  },
  textarea: {
    minHeight: 92,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  entryCard: {
    backgroundColor: palette.panel2,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    marginTop: 12,
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: palette.text,
    fontWeight: '700',
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: palette.accent,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#00111f',
    fontWeight: '800',
    fontSize: 15,
  },
  removeText: {
    color: palette.danger,
    fontWeight: '700',
  },
  statusWrap: {
    marginTop: 10,
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: 'rgba(7,17,31,0.55)',
    padding: 14,
  },
  statusText: {
    fontWeight: '600',
  },
  good: {
    color: palette.good,
  },
  warn: {
    color: palette.accent2,
  },
  successText: {
    marginTop: 12,
    color: palette.good,
    fontWeight: '700',
    lineHeight: 20,
  },
  noteBox: {
    marginTop: 8,
    borderRadius: 16,
    padding: 14,
    backgroundColor: palette.accentSoft,
    gap: 6,
  },
  noteTitle: {
    color: palette.text,
    fontWeight: '800',
    fontSize: 15,
  },
});
