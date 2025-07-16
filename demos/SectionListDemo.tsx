import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, Pressable, Alert } from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface ContactSection {
  title: string;
  data: Contact[];
}

const SectionListDemo: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState<ContactSection[]>([
    {
      title: 'A',
      data: [
        { id: '1', name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com' },
        { id: '2', name: 'Alex Smith', phone: '555-0102', email: 'alex@example.com' },
        { id: '3', name: 'Anna Wilson', phone: '555-0103', email: 'anna@example.com' },
      ],
    },
    {
      title: 'B',
      data: [
        { id: '4', name: 'Bob Brown', phone: '555-0201', email: 'bob@example.com' },
        { id: '5', name: 'Betty Davis', phone: '555-0202', email: 'betty@example.com' },
      ],
    },
    {
      title: 'C',
      data: [
        { id: '6', name: 'Charlie Miller', phone: '555-0301', email: 'charlie@example.com' },
        { id: '7', name: 'Carol White', phone: '555-0302', email: 'carol@example.com' },
        { id: '8', name: 'Chris Anderson', phone: '555-0303', email: 'chris@example.com' },
      ],
    },
    {
      title: 'D',
      data: [
        { id: '9', name: 'David Taylor', phone: '555-0401', email: 'david@example.com' },
        { id: '10', name: 'Diana Martinez', phone: '555-0402', email: 'diana@example.com' },
      ],
    },
    {
      title: 'E',
      data: [
        { id: '11', name: 'Emily Garcia', phone: '555-0501', email: 'emily@example.com' },
        { id: '12', name: 'Ethan Rodriguez', phone: '555-0502', email: 'ethan@example.com' },
      ],
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed!', 'Contact list has been updated.');
    }, 2000);
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <Pressable
      style={styles.contactItem}
      onPress={() => Alert.alert(item.name, `Phone: ${item.phone}\nEmail: ${item.email}`)}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
      </View>
      <View style={styles.contactActions}>
        <Pressable
          style={[styles.actionButton, styles.callButton]}
          onPress={() => Alert.alert('Call', `Calling ${item.name}`)}
        >
          <Text style={styles.actionButtonText}>📞</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.emailButton]}
          onPress={() => Alert.alert('Email', `Emailing ${item.name}`)}
        >
          <Text style={styles.actionButtonText}>✉️</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderSectionHeader = ({ section }: { section: ContactSection }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
      <Text style={styles.sectionCount}>({section.data.length} contacts)</Text>
    </View>
  );

  const renderSectionFooter = ({ section }: { section: ContactSection }) => (
    <View style={styles.sectionFooter}>
      <Text style={styles.sectionFooterText}>
        End of {section.title} section
      </Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No contacts found</Text>
      <Text style={styles.emptySubtext}>Add some contacts to get started</Text>
    </View>
  );

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderSectionSeparator = () => <View style={styles.sectionSeparator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SectionList Demo</Text>
      <Text style={styles.description}>
        This demo shows SectionList for displaying grouped data.
        SectionList is perfect for alphabetical lists, categories, or any grouped content.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{sections.length}</Text>
          <Text style={styles.statLabel}>Sections</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {sections.reduce((total, section) => total + section.data.length, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Contacts</Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        renderItem={renderContact}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        ItemSeparatorComponent={renderItemSeparator}
        SectionSeparatorComponent={renderSectionSeparator}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={true}
        style={styles.sectionList}
        contentContainerStyle={styles.sectionListContent}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Pull down to refresh • Tap contact for details • Sticky headers enabled
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionList: {
    flex: 1,
    marginHorizontal: 20,
  },
  sectionListContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  sectionFooter: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 5,
  },
  sectionFooterText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#4ECDC4',
  },
  emailButton: {
    backgroundColor: '#FF6B6B',
  },
  actionButtonText: {
    fontSize: 18,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginHorizontal: 15,
  },
  sectionSeparator: {
    height: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default SectionListDemo;
