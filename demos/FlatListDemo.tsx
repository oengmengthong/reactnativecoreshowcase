import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

interface ListItem {
  id: string;
  title: string;
  description: string;
}

const FlatListDemo: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ListItem[]>(
    Array.from({ length: 20 }, (_, index) => ({
      id: `item-${index}`,
      title: `Item ${index + 1}`,
      description: `This is the description for item ${index + 1}`,
    }))
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(prevData => [
        ...prevData,
        ...Array.from({ length: 5 }, (_, index) => ({
          id: `item-${prevData.length + index}`,
          title: `New Item ${prevData.length + index + 1}`,
          description: `This is a new item added on refresh`,
        }))
      ]);
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
    <View style={[styles.listItem, index % 2 === 0 && styles.evenItem]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Pull to refresh for more items</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>End of list</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FlatList Demo</Text>
      <Text style={styles.description}>
        This demo shows FlatList with pull-to-refresh functionality.
        FlatList provides optimized rendering for large lists.
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  evenItem: {
    backgroundColor: '#f8f8f8',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  headerContainer: {
    padding: 15,
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default FlatListDemo;
