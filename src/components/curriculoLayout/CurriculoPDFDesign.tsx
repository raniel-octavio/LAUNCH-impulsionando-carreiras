import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e293b",
  },

  sidebar: {
    width: "31%",
    backgroundColor: "#07111F",
    padding: 24,
    color: "white",
  },

  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#22d3ee",
    alignSelf: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  headline: {
    color: "#67e8f9",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },

  sidebarTitle: {
    color: "#67e8f9",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  sidebarItem: {
    marginBottom: 6,
    fontSize: 9,
  },

  badge: {
    backgroundColor: "#163457",
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
  },

  badgeText: {
    color: "white",
    fontSize: 9,
  },

  content: {
    width: "69%",
    backgroundColor: "#f8fafc",
  },

  hero: {
    backgroundColor: "#157dd6",
    padding: 30,
    color: "white",
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  heroText: {
    fontSize: 11,
    lineHeight: 1.5,
  },

  body: {
    padding: 22,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dbeafe",
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0f172a",
  },

  text: {
    lineHeight: 1.5,
  },

  listItem: {
    marginBottom: 5,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  half: {
    width: "48%",
  },
});

export function CurriculoPDFDesign({ formData }: { formData: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>

          <Image
            src={formData.avatar || "/avatar.png"}
            style={styles.photo}
          />

          <Text style={styles.name}>
            {formData.name}
          </Text>

          <Text style={styles.headline}>
            {formData.headline}
          </Text>

          <Text style={styles.sidebarTitle}>
            Contato
          </Text>

          <Text style={styles.sidebarItem}>
            {formData.location}
          </Text>

          <Text style={styles.sidebarItem}>
            {formData.email}
          </Text>

          <Text style={styles.sidebarItem}>
            {formData.phone}
          </Text>

          <Text style={styles.sidebarItem}>
            {formData.linkedin}
          </Text>

          <Text style={styles.sidebarTitle}>
            Competências
          </Text>

          {formData.skills?.map((skill: string, i: number) => (
            <View key={i} style={styles.badge}>
              <Text style={styles.badgeText}>{skill}</Text>
            </View>
          ))}

          <Text style={styles.sidebarTitle}>
            Idiomas
          </Text>

          {formData.languages?.map((lang: string, i: number) => (
            <Text key={i} style={styles.sidebarItem}>
              • {lang}
            </Text>
          ))}

        </View>

        <View style={styles.content}>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              {formData.desiredPosition}
            </Text>

            <Text style={styles.heroText}>
              {formData.about}
            </Text>
          </View>

          <View style={styles.body}>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Experiência Profissional
              </Text>

              <Text style={styles.text}>
                {formData.experience}
              </Text>
            </View>

            <View style={styles.grid}>

              <View style={[styles.card, styles.half]}>
                <Text style={styles.cardTitle}>
                  Formação
                </Text>

                <Text>{formData.education}</Text>
              </View>

              <View style={[styles.card, styles.half]}>
                <Text style={styles.cardTitle}>
                  Objetivo
                </Text>

                <Text>
                  Cargo: {formData.desiredPosition}
                </Text>

                <Text>
                  Pretensão: {formData.salaryExpectation}
                </Text>
              </View>

            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Certificações
              </Text>

              {formData.certifications?.map((item: string, i: number) => (
                <Text key={i} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Cursos
              </Text>

              {formData.courses?.map((item: string, i: number) => (
                <Text key={i} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Conquistas
              </Text>

              {formData.achievements?.map((item: string, i: number) => (
                <Text key={i} style={styles.listItem}>
                  ⭐ {item}
                </Text>
              ))}
            </View>

          </View>

        </View>
      </Page>
    </Document>
  );
}