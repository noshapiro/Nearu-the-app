import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, fonts } from '@/theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary:', error);
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error.message}</Text>
          <Text style={styles.stack} numberOfLines={20}>
            {this.state.error.stack}
          </Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.void },
  content: { padding: 24, paddingTop: 60 },
  title: {
    fontFamily: fonts.uiSemiBold,
    fontSize: 20,
    color: colors.coral,
    marginBottom: 12,
  },
  message: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  stack: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.textTertiary,
  },
});
