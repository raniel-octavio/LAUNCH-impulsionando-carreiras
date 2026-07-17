"use client";

import React, { useState } from "react";
import { CURRENT_USER_ID } from "@/lib/seed";

export function CurriculoLayout({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    ...user,
    skills: user.skills || [],
    certifications: user.certifications || [],
    languages: user.languages || [],
    courses: user.courses || [],
    achievements: user.achievements || [],
  });

  if (!user) return null;

  const isCurrentUser = user.id === CURRENT_USER_ID;

  const handleSave = () => {
    console.log("Dados salvos:", formData);

    // Aqui você poderá futuramente enviar para API
    // await updateUser(formData)

    setIsEditing(false);
  };

  const handleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayField = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div
        id="curriculo"
        className="bg-launch-surface rounded-sm border border-launch-border overflow-hidden"
      >
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-launch-gold to-launch-ink p-8 text-white flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full bg-launch-surface/20 flex items-center justify-center text-3xl font-bold">
              {formData.avatar}
            </div>

            <div className="space-y-2">
              {isEditing ? (
                <>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    className="bg-launch-elevated text-launch-white border border-launch-border px-3 py-2 rounded w-full text-2xl font-bold"
                  />

                  <input
                    value={formData.headline}
                    onChange={(e) =>
                      updateField("headline", e.target.value)
                    }
                    className="bg-launch-elevated text-launch-white border border-launch-border px-3 py-2 rounded w-full"
                  />

                  <input
                    value={formData.location}
                    onChange={(e) =>
                      updateField("location", e.target.value)
                    }
                    className="bg-launch-elevated text-launch-white border border-launch-border px-3 py-2 rounded w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold">
                    {formData.name}
                  </h1>
                  <p className="text-xl text-launch-muted mt-1">
                    {formData.headline}
                  </p>
                  <p className="mt-2 text-sm text-launch-muted">
                    {formData.location}
                  </p>
                </>
              )}
            </div>
          </div>

          {isCurrentUser && (
            <button
              onClick={handleEdit}
              className={`px-5 py-2 relative left-4 rounded-lg font-medium transition ${
                isEditing
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-launch-gold hover:bg-launch-gold-bright text-white"
              }`}
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-8 space-y-8">
          {/* Resumo */}
          <section>
            <h2 className="text-2xl font-bold text-launch-white mb-4">
              Resumo Profissional
            </h2>

            {isEditing ? (
              <textarea
                value={formData.about}
                onChange={(e) =>
                  updateField("about", e.target.value)
                }
                rows={5}
                className="w-full border border-launch-border rounded-lg p-3 bg-launch-elevated text-launch-white"
              />
            ) : (
              <p className="text-launch-soft whitespace-pre-line">
                {formData.about}
              </p>
            )}
          </section>

          {/* Objetivo */}
          <section>
            <h2 className="text-2xl font-bold text-launch-white mb-4">
              Objetivo Profissional
            </h2>

            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={formData.desiredPosition}
                  onChange={(e) =>
                    updateField("desiredPosition", e.target.value)
                  }
                  placeholder="Cargo desejado"
                  className="border rounded-lg p-3"
                />

                <input
                  value={formData.salaryExpectation}
                  onChange={(e) =>
                    updateField("salaryExpectation", e.target.value)
                  }
                  placeholder="Pretensão salarial"
                  className="border rounded-lg p-3"
                />
              </div>
            ) : (
              <>
                <p>
                  <strong>Cargo Desejado:</strong>{" "}
                  {formData.desiredPosition}
                </p>
                <p>
                  <strong>Pretensão Salarial:</strong>{" "}
                  {formData.salaryExpectation}
                </p>
              </>
            )}
          </section>

          {/* Dados pessoais */}
          <section>
            <h2 className="text-2xl font-bold text-launch-white mb-4">
              Dados Pessoais
            </h2>

            {isEditing ? (
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  value={formData.birthDate}
                  onChange={(e) =>
                    updateField("birthDate", e.target.value)
                  }
                  placeholder="Nascimento"
                  className="border rounded-lg p-3"
                />

                <input
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    updateField("maritalStatus", e.target.value)
                  }
                  placeholder="Estado civil"
                  className="border rounded-lg p-3"
                />

                <input
                  value={formData.connections}
                  onChange={(e) =>
                    updateField("connections", e.target.value)
                  }
                  placeholder="Conexões"
                  className="border rounded-lg p-3"
                />
              </div>
            ) : (
              <>
                <p>
                  <strong>Data de Nascimento:</strong>{" "}
                  {formData.birthDate}
                </p>
                <p>
                  <strong>Estado Civil:</strong>{" "}
                  {formData.maritalStatus}
                </p>
                <p>
                  <strong>Conexões:</strong>{" "}
                  {formData.connections}
                </p>
              </>
            )}
          </section>

          {/* Formação */}
          <section>
            <h2 className="text-2xl font-bold text-launch-white mb-4">
              Formação Acadêmica
            </h2>

            {isEditing ? (
              <textarea
                value={formData.education}
                onChange={(e) =>
                  updateField("education", e.target.value)
                }
                rows={4}
                className="w-full border border-launch-border rounded-lg p-3 bg-launch-elevated text-launch-white"
              />
            ) : (
              <p>{formData.education}</p>
            )}
          </section>

          {/* Experiência */}
          <section>
            <h2 className="text-2xl font-bold text-launch-white mb-4">
              Experiência Profissional
            </h2>

            {isEditing ? (
              <textarea
                value={formData.experience}
                onChange={(e) =>
                  updateField("experience", e.target.value)
                }
                rows={8}
                className="w-full border border-launch-border rounded-lg p-3 bg-launch-elevated text-launch-white"
              />
            ) : (
              <p className="whitespace-pre-line">
                {formData.experience}
              </p>
            )}
          </section>

          {/* Arrays */}
          {[
            ["skills", "Competências"],
            ["certifications", "Certificações"],
            ["languages", "Idiomas"],
            ["courses", "Cursos Complementares"],
            ["achievements", "Conquistas"],
          ].map(([field, title]) => (
            <section key={field}>
              <h2 className="text-2xl font-bold text-launch-white mb-4">
                {title}
              </h2>

              {isEditing ? (
                <textarea
                  value={formData[field]?.join(", ")}
                  onChange={(e) =>
                    updateArrayField(field, e.target.value)
                  }
                  rows={3}
                  className="w-full border border-launch-border rounded-lg p-3 bg-launch-elevated text-launch-white"
                  placeholder="Separe os itens por vírgula"
                />
              ) : field === "skills" ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills?.map((item: string) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-launch-gold/10 text-launch-gold-bright text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <ul className="list-disc ml-5 space-y-2">
                  {formData[field]?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}