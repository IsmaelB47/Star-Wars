import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SpaceshipsScreen() {
  const [starships, setStarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchStarships();
  }, []);

  const fetchStarships = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/starships");
      const data = await response.json();
      setStarships(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading ships...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spaceships</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Spaceships..."
          onSubmitEditing={(e) => {
            setSubmittedText(e.nativeEvent.text);
            setModalVisible(true);
          }}
        />
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>
              Ship query received: {submittedText}
            </Text>
            <Text
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              Close
            </Text>
          </View>
        </View>
      </Modal>

      <FlatList
        data={starships}
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
  textInput: {
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
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
