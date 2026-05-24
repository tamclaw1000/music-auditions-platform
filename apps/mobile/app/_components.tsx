import type { ReactNode } from 'react';
import { Text, TextInput, View } from 'react-native';
import { palette, styles } from './_theme';

export function SectionCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

export function LabeledInput({
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
