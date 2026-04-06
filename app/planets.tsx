import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
// Fetch data from SWAPI when the screen loads
  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/planets');
      const data = await response.json();
      setPlanets(data.results || []);
    } catch (err) {
      setError('Failed to load planets.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading planets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planets</Text>
  {/* Display the data using FlatList */}
      <FlatList
        data={planets}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
});