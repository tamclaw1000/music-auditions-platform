import { ScrollView, Text, View } from 'react-native';
import { featuredOrganizations, musicianWorkflow, organizationWorkflow } from '../../../packages/shared/src/content';

const card = {
  backgroundColor: '#0f1b2d',
  borderRadius: 18,
  padding: 18,
  marginBottom: 16,
};

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#07111f' }} contentContainerStyle={{ padding: 20 }}>
      <View style={card}>
        <Text style={{ color: '#87d7ff', fontSize: 12, fontWeight: '700', marginBottom: 10 }}>MOBILE EXPERIENCE</Text>
        <Text style={{ color: '#eef4ff', fontSize: 30, fontWeight: '800', marginBottom: 12 }}>
          Submit auditions and manage organizations from your phone.
        </Text>
        <Text style={{ color: '#a9b7cf', fontSize: 16, lineHeight: 24 }}>
          Musicians can browse calls, upload multiple audition videos, and track status. Organizations can publish requirements and review submissions on the go.
        </Text>
      </View>

      <View style={card}>
        <Text style={{ color: '#eef4ff', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Musician flow</Text>
        {musicianWorkflow.map((step) => (
          <View key={step.title} style={{ marginBottom: 12 }}>
            <Text style={{ color: '#eef4ff', fontWeight: '700', marginBottom: 4 }}>{step.title}</Text>
            <Text style={{ color: '#a9b7cf', lineHeight: 22 }}>{step.description}</Text>
          </View>
        ))}
      </View>

      <View style={card}>
        <Text style={{ color: '#eef4ff', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Organization flow</Text>
        {organizationWorkflow.map((step) => (
          <View key={step.title} style={{ marginBottom: 12 }}>
            <Text style={{ color: '#eef4ff', fontWeight: '700', marginBottom: 4 }}>{step.title}</Text>
            <Text style={{ color: '#a9b7cf', lineHeight: 22 }}>{step.description}</Text>
          </View>
        ))}
      </View>

      <View style={card}>
        <Text style={{ color: '#eef4ff', fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Featured organizations</Text>
        {featuredOrganizations.map((organization) => (
          <View key={organization.name} style={{ marginBottom: 14 }}>
            <Text style={{ color: '#eef4ff', fontWeight: '700', marginBottom: 4 }}>{organization.name}</Text>
            <Text style={{ color: '#a9b7cf', lineHeight: 22 }}>{organization.summary}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
