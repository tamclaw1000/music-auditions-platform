import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { featuredOrganizations, musicianWorkflow, organizationWorkflow } from '../../../packages/shared/src/content';
import { SectionCard } from './_components';
import { styles } from './_theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <SectionCard>
        <Text style={styles.kicker}>PRIMARY MOBILE FRONT END</Text>
        <Text style={styles.heroTitle}>Music submissions built for iPhone and Android first.</Text>
        <Text style={styles.body}>
          This acceptance build now has dedicated navigation paths for musicians and organizations, instead of forcing both audiences through one long mixed screen.
        </Text>
      </SectionCard>

      <Link href="/musicians" asChild>
        <Pressable style={styles.navButton}>
          <Text style={styles.navButtonTitle}>Musician experience</Text>
          <Text style={styles.body}>Browse opportunities, inspect requirements, build a profile, and prepare multi-audition submissions.</Text>
        </Pressable>
      </Link>

      <Link href="/organizations" asChild>
        <Pressable style={styles.navButton}>
          <Text style={styles.navButtonTitle}>Organization experience</Text>
          <Text style={styles.body}>Register an organization, draft submission requirements, and preview what musicians will see.</Text>
        </Pressable>
      </Link>

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
        <Text style={styles.sectionTitle}>Current sample opportunities</Text>
        {featuredOrganizations.map((opportunity) => (
          <View key={opportunity.id} style={styles.listItem}>
            <Text style={styles.flowTitle}>{opportunity.organizationName}</Text>
            <Text style={styles.muted}>{opportunity.title}</Text>
            <Text style={styles.body}>{opportunity.description}</Text>
          </View>
        ))}
      </SectionCard>
    </ScrollView>
  );
}
