import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { featuredOrganizations } from '../../../packages/shared/src/content';
import type { MusicianProfile, Opportunity, SubmissionEntry } from '../../../packages/shared/src/types';
import { LabeledInput, SectionCard } from './_components';
import { styles } from './_theme';

const emptyProfile: MusicianProfile = {
  fullName: '',
  email: '',
  primaryInstrument: '',
  city: '',
  bio: '',
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

export default function MusiciansScreen() {
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(featuredOrganizations[0]?.id ?? '');
  const [profile, setProfile] = useState<MusicianProfile>(emptyProfile);
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
        <Text style={styles.kicker}>MUSICIAN PAGE</Text>
        <Text style={styles.heroTitle}>Browse opportunities and prepare an audition package.</Text>
        <Text style={styles.body}>This screen mirrors the musician side of the website with a dedicated mobile-first flow.</Text>
      </SectionCard>

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
    </ScrollView>
  );
}
