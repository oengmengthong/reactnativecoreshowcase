import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, VirtualizedList, Pressable, Alert } from 'react-native';

interface DataItem {
  id: string;
  title: string;
  description: string;
  color: string;
}

const VirtualizedListDemo: React.FC = () => {
  const listRef = useRef<VirtualizedList<DataItem>>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Generate a large dataset to demonstrate virtualization
  const generateData = (count: number): DataItem[] => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F8B500', '#E17055'];
    return Array.from({ length: count }, (_, index) => ({
      id: `item-${index}`,
      title: `Item ${index + 1}`,
      description: `This is the description for item ${index + 1}. It contains some sample text to demonstrate how VirtualizedList handles variable content lengths.`,
      color: colors[index % colors.length],
    }));
  };

  const [data, setData] = useState<DataItem[]>(generateData(1000));

  const getItem = (listData: DataItem[], index: number) => listData[index];
  const getItemCount = (listData: DataItem[]) => listData.length;
  const keyExtractor = (item: DataItem) => item.id;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(generateData(1000));
      setRefreshing(false);
      Alert.alert('Refreshed!', 'Data has been regenerated');
    }, 1500);
  };

  const renderItem = ({ item, index }: { item: DataItem; index: number }) => (
    <Pressable
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={() => Alert.alert(item.title, `Index: ${index}\n${item.description}`)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemIndex}>Index: {index}</Text>
      </View>
    </Pressable>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>VirtualizedList Demo</Text>
      <Text style={styles.headerSubtext}>1000 items with efficient virtualization</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>End of list • {data.length} items total</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items to display</Text>
    </View>
  );

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const scrollToEnd = () => {
    listRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToMiddle = () => {
    const middleIndex = Math.floor(data.length / 2);
    listRef.current?.scrollToIndex({ index: middleIndex, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={styles.title}>VirtualizedList Demo</Text>
        <Text style={styles.description}>
          VirtualizedList is the base component for FlatList and SectionList.
          It efficiently renders large datasets by only rendering visible items.
        </Text>
        
        <View style={styles.buttonRow}>
          <Pressable style={styles.controlButton} onPress={scrollToTop}>
            <Text style={styles.controlButtonText}>Top</Text>
          </Pressable>
          <Pressable style={styles.controlButton} onPress={scrollToMiddle}>
            <Text style={styles.controlButtonText}>Middle</Text>
          </Pressable>
          <Pressable style={styles.controlButton} onPress={scrollToEnd}>
            <Text style={styles.controlButtonText}>End</Text>
          </Pressable>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{data.length}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>~10</Text>
            <Text style={styles.statLabel}>Rendered</Text>
          </View>
        </View>
      </View>

      <VirtualizedList
        ref={listRef}
        data={data}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItem={getItem}
        getItemCount={getItemCount}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshing={refreshing}
        onRefresh={onRefresh}
        removeClippedSubviews={true}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        getItemLayout={(_, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          console.log('Scroll to index failed:', info);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  controls: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  controlButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
  },
  header: {
    backgroundColor: '#4ECDC4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  footer: {
    backgroundColor: '#e8e8e8',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  item: {
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 5,
  },
  itemIndex: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  separator: {
    height: 5,
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
  },
});

export default VirtualizedListDemo;
