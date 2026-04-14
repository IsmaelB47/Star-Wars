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

export default function FilmsScreen() {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittedText, setSubmittedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      setFilms(data.result || data.results || []);
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
        <Text>Loading films...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Films</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Films..."
          onSubmitEditing={(e) => {
            setSubmittedText(e.nativeEvent.text);
            setModalVisible(true);
          }}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>
              Searching for film: {submittedText}
            </Text>
            <Text
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              Dismiss
            </Text>
          </View>
        </View>
      </Modal>

      <FlatList
        data={films}
        keyExtractor={(item, index) => item.uid?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.properties?.title || item.title}
            </Text>
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
