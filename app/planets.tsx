import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Chapter 22 & 23 State
  const [changedText, setChangedText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/planets");
      const data = await response.json();
      setPlanets(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading planets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planets</Text>

      {/* Chapter 22: Collecting User Input */}
      <View style={styles.textInputContainer}>
        <Text style={styles.textInputLabel}>Search Planets:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          onChangeText={(text) => setChangedText(text)}
          onSubmitEditing={(e) => {
            setSubmittedText(e.nativeEvent.text);
            setModalVisible(true);
          }}
        />
        <Text style={styles.debugText}>Changed: {changedText}</Text>
      </View>

      {/* Chapter 23: Modal Implementation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>Search Submitted!</Text>
            <Text style={styles.modalText}>Query: {submittedText}</Text>
            <Text
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              OK
            </Text>
          </View>
        </View>
      </Modal>

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
  container: { flex: 1, padding: 20, backgroundColor: "ghostwhite" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  textInputContainer: { marginBottom: 20 },
  textInputLabel: { fontSize: 14, fontWeight: "bold" },
  textInput: {
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  debugText: { fontSize: 12, color: "gray", marginTop: 5 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  itemText: { fontSize: 18 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalInner: {
    backgroundColor: "azure",
    padding: 20,
    borderWidth: 1,
    borderColor: "lightsteelblue",
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  modalText: { fontSize: 16, margin: 5, color: "slategrey" },
  modalButton: { fontWeight: "bold", marginTop: 15, color: "slategrey" },
});
