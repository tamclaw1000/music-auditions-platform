import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import type { OrganizationDraft } from '../../../packages/shared/src/types';
import { LabeledInput, SectionCard } from './_components';
import { styles } from './_theme';

const emptyOrgDraft: OrganizationDraft = {
  organizationName: '',
  contactName: '',
  email: '',
  programTitle: '',
  deadline: '',
  requirementsText: '',
};

export default function OrganizationsScreen() {
  const [orgDraft, setOrgDraft] = useState<OrganizationDraft>(emptyOrgDraft);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <SectionCard>
        <Text style={styles.kicker}>ORGANIZATION PAGE</Text>
        <Text style={styles.heroTitle}>Register and publish clear audition requirements.</Text>
        <Text style={styles.body}>This screen mirrors the organization side of the website with a dedicated intake and publishing flow.</Text>
      </SectionCard>

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
            Expo stays the right choice here because the future recording/upload workflow can use shared mobile-native camera and media APIs without creating separate iOS and Android code paths.
          </Text>
        </View>
      </SectionCard>
    </ScrollView>
  );
}
