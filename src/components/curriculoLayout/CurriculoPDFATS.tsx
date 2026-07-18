import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000", // texto preto para máxima legibilidade ATS
    padding: 32, // margens menores para caber mais conteúdo
    fontSize: 10.5, // fonte levemente menor para otimizar espaço
    fontFamily: "Helvetica",
    lineHeight: 1.35,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  headline: { fontSize: 13, marginBottom: 4 },
  location: { fontSize: 10.5, marginBottom: 2 },
  contact: { fontSize: 10.5 },
  section: { marginBottom: 14 }, // menos espaço entre seções
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  listItem: { fontSize: 10.5, marginLeft: 10, marginBottom: 2 },
  paragraph: { fontSize: 10.5, marginBottom: 4 },
});

export function CurriculoPDFATS({ formData }: { formData: any }) {
  const normalize = (content: any) =>
    Array.isArray(content) ? content : content ? [content] : [];

  const renderSection = (title: string, content: any) => {
    const items = normalize(content);
    if (!items.length) return null; // não renderiza se vazio

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.length === 1 ? (
          <Text style={styles.paragraph}>{items[0]}</Text>
        ) : (
          items.map((item: string, i: number) => (
            <Text key={i} style={styles.listItem}>• {item}</Text>
          ))
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{formData.name}</Text>
          <Text style={styles.headline}>{formData.headline}</Text>
          <Text style={styles.location}>{formData.location}</Text>
          <Text style={styles.contact}>
            {formData.email} | {formData.phone} | {formData.linkedin}
          </Text>
        </View>

        {/* Seções compactadas */}
        {renderSection("Resumo Profissional", formData.about)}
        {renderSection("Objetivo Profissional", [
          `Cargo: ${formData.desiredPosition}`,
          `Pretensão: ${formData.salaryExpectation}`,
        ])}
        {renderSection("Formação Acadêmica", formData.education)}
        {renderSection("Experiência Profissional", formData.experience)}
        {renderSection("Competências", formData.skills)}
        {renderSection("Certificações", formData.certifications)}
        {renderSection("Idiomas", formData.languages)}
        {renderSection("Cursos Complementares", formData.courses)}
        {renderSection("Conquistas", formData.achievements)}
      </Page>
    </Document>
  );
}
