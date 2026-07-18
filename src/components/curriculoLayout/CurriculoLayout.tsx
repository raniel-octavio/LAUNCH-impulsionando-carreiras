"use client";
import { pdf } from "@react-pdf/renderer";
import { CurriculoPDFATS } from "./CurriculoPDFATS";
import { CurriculoPDFDesign } from "./CurriculoPDFDesign";
import { jsPDF } from "jspdf";
import React, { useRef, useState } from "react";
import { CURRENT_USER_ID } from "@/lib/seed";
import {
  Mail,
  Send,
  Smartphone,
  FileText,
  Layout,
  Download,
  X,
  Share2,
  Save,
  Pencil,
} from "lucide-react";

export function CurriculoLayout({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<"ATS" | "DESIGN">("ATS");
  const curriculumRef = useRef<HTMLDivElement>(null);

  const [loadingPdf, setLoadingPdf] = useState(false);

  const [showSendModal, setShowSendModal] = useState(false);

  const [sending, setSending] = useState(false);

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

  const handleSave = async () => {
      try {
        await fetch("/api/saveCurriculo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        console.log("Currículo salvo com sucesso!");
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao salvar currículo:", error);
      }
    };


    const handleEdit = () => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        };

        const handleDownload = async () => {
''
        const component =
            viewMode === "ATS"
                ? <CurriculoPDFATS formData={formData}/>
                : <CurriculoPDFDesign formData={formData}/>;

        const blob = await pdf(component).toBlob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = `Curriculo-${formData.name}.pdf`;

        a.click();

        URL.revokeObjectURL(url);
    };

    const updateField = (field: string, value: string) => {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    };

    const updateArrayField = (field: string, value: string) => {
      const items = value.split(",").map((item) => item.trim());
      setFormData((prev: any) => ({
        ...prev,
        [field]: items,
      }));
    };


  const sectionMap = {
    "Resumo Profissional": "about",

    "Objetivo Profissional": "desiredPosition",

    "Formação Acadêmica": "education",

    "Experiência Profissional": "experience",

    "Competências": "skills",

    "Certificações": "certifications",

    "Idiomas": "languages",

    "Cursos Complementares": "courses",

    "Conquistas": "achievements",
  } as const;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="sticky top-4 z-40 mb-8">

      <div className="bg-white rounded-2xl border shadow-lg p-4">

      <div className="flex flex-wrap items-center justify-between gap-3">

      <div className="flex gap-2">

      <button
      onClick={() => setViewMode("ATS")}
      className={`px-5 py-2 rounded-xl transition flex items-center gap-2 ${
      viewMode==="ATS"
      ? "bg-slate-900 text-white"
      : "bg-gray-100 hover:bg-gray-200"
      }`}
      >

      <FileText size={18}/>

      ATS

      </button>

      <button
      onClick={()=>setViewMode("DESIGN")}
      className={`px-5 py-2 rounded-xl transition flex items-center gap-2 ${
      viewMode==="DESIGN"
      ? "bg-indigo-600 text-white"
      : "bg-gray-100 hover:bg-gray-200"
      }`}
      >

      <Layout size={18}/>

      Design

      </button>

      </div>

      <div className="flex flex-wrap gap-2">

      <button
      onClick={()=>setShowSendModal(true)}
      className="px-5 py-2 rounded-xl transition flex items-center gap-2" style={{ backgroundColor: "#0284c7", color: "#fff" }}
      >

      <Share2 size={18}/>

      Compartilhar

      </button>

      {isCurrentUser && (

      <button

      onClick={handleEdit}

      className={`px-5 py-2 rounded-xl flex items-center gap-2 transition ${
      isEditing
      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
      : "bg-amber-500 hover:bg-amber-600 text-white"
      }`}

      >

      {isEditing ? <Save size={18}/> : <Pencil size={18}/>}

      {isEditing ? "Salvar" : "Editar"}

      </button>

      )}

      </div>

      </div>

      </div>

      </div>

      {/* Currículo ATS */}
      {viewMode === "ATS" && (
        <div ref={curriculumRef} className="bg-white text-gray-900 rounded-3xl shadow-xl border border-gray-200 overflow-hidden p-6 md:p-10 font-sans ">
          <header className="border-b pb-4 mb-6">
            {isEditing ? (
              <>
                <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="text-3xl font-bold w-full border p-2 mb-2" />
                <input value={formData.headline} onChange={(e) => updateField("headline", e.target.value)} className="text-lg w-full border p-2 mb-2" />
                <input value={formData.location} onChange={(e) => updateField("location", e.target.value)} className="text-sm w-full border p-2 mb-2" />
                <input value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="text-sm w-full border p-2 mb-2" />
                <input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="text-sm w-full border p-2 mb-2" />
                <input value={formData.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} className="text-sm w-full border p-2 mb-2" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{formData.name}</h1>
                <p className="text-lg">{formData.headline}</p>
                <p className="text-sm">{formData.location}</p>
                <p className="text-sm">{formData.email} | {formData.phone} | {formData.linkedin}</p>
              </>
            )}
          </header>

          {[
            ["Resumo Profissional", formData.about],
            ["Objetivo Profissional", `Cargo: ${formData.desiredPosition} | Pretensão: ${formData.salaryExpectation}`],
            ["Formação Acadêmica", formData.education],
            ["Experiência Profissional", formData.experience],
            ["Competências", formData.skills],
            ["Certificações", formData.certifications],
            ["Idiomas", formData.languages],
            ["Cursos Complementares", formData.courses],
            ["Conquistas", formData.achievements],
          ].map(([title, content]) => (
            <section key={title as string} className="mb-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              {isEditing ? (
                Array.isArray(content) ? (
                  <textarea value={content.join(", ")} onChange={(e) => updateArrayField(sectionMap[title as keyof typeof sectionMap],e.target.value)} className="w-full border p-2" />
                ) : (
                  <textarea value={content as string} onChange={(e) => updateField(sectionMap[title as keyof typeof sectionMap], e.target.value)} className="w-full border p-2" />
                )
              ) : Array.isArray(content) ? (
                <ul className="list-disc ml-5">
                  {content.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{content}</p>
              )}
            </section>
          ))}
        </div>
      )}

      {viewMode === "DESIGN" && (
      <div
          ref={curriculumRef}
          className="
          overflow-hidden
          rounded-[36px]
          border
          border-slate-200
          bg-white
          shadow-2xl
      ">

      <div className="grid lg:grid-cols-[340px_1fr]">

          {/* ========================================= */}
          {/* SIDEBAR */}
          {/* ========================================= */}

          <aside className="
          relative
          overflow-hidden
          bg-gradient-to-b
          from-[#07111F]
          via-[#0E1C33]
          to-[#153457]
          text-white
          ">

              {/* Glow */}

              <div className="absolute inset-0">

                  <div className="
                  absolute
                  -top-16
                  -left-16
                  w-64
                  h-64
                  rounded-full
                  bg-sky-500/20
                  blur-3xl
                  "/>

                  <div className="
                  absolute
                  bottom-0
                  right-0
                  w-72
                  h-72
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                  "/>

              </div>

              <div className="relative p-10">

                  {/* FOTO */}

                  <div className="flex justify-center">

                      <div className="
                      w-40
                      h-40
                      rounded-full
                      overflow-hidden
                      border-[5px]
                      border-cyan-400
                      shadow-[0_0_40px_rgba(56,189,248,.35)]
                      ">

                          <img
                              src={formData.avatar || "/avatar.png"}
                              className="w-full h-full object-cover"
                          />

                      </div>

                  </div>

                  {/* NOME */}

                  <div className="mt-8 text-center">

                      <h1 className="text-3xl font-black">

                          {formData.name}

                      </h1>

                      <p className="mt-2 text-cyan-300 font-medium">

                          {formData.headline}

                      </p>

                  </div>

                  {/* CONTATO */}

                  <div className="mt-10 space-y-4 text-sm text-slate-300">

                      <div>📍 {formData.location}</div>

                      <div>✉ {formData.email}</div>

                      <div>📞 {formData.phone}</div>

                      <div>🌐 {formData.linkedin}</div>

                  </div>

                  {/* SKILLS */}

                  <div className="mt-12">

                      <h3 className="uppercase tracking-[4px] text-xs text-cyan-300 mb-5">

                          Competências

                      </h3>

                      <div className="flex flex-wrap gap-2">

                          {formData.skills.map((skill:string)=>(
                              <span
                                  key={skill}
                                  className="
                                  px-3
                                  py-2
                                  rounded-full
                                  bg-white/10
                                  border
                                  border-cyan-400/20
                                  text-cyan-100
                                  text-xs
                                  "
                              >
                                  {skill}
                              </span>
                          ))}

                      </div>

                  </div>

                  {/* IDIOMAS */}

                  <div className="mt-12">

                      <h3 className="uppercase tracking-[4px] text-xs text-cyan-300 mb-5">

                          Idiomas

                      </h3>

                      <div className="space-y-5">

                          {formData.languages.map((language:string)=>(

                              <div key={language}>

                                  <div className="flex justify-between text-sm">

                                      <span>{language}</span>

                                      <span>★★★★★</span>

                                  </div>

                                  <div className="mt-2 h-2 rounded-full bg-white/10">

                                      <div className="w-4/5 h-full rounded-full bg-cyan-400"/>

                                  </div>

                              </div>

                          ))}

                      </div>

                  </div>

              </div>

          </aside>



          {/* ========================================= */}
          {/* MAIN */}
          {/* ========================================= */}

          <section className="bg-slate-50">

              {/* HERO */}

              <div className="
              px-12
              py-10
              bg-gradient-to-r
              from-sky-600
              via-blue-600
              to-cyan-600
              text-white
              ">

                  <div className="flex justify-between items-start">

                      <div>


                          <h2 className="mt-3 text-5xl font-black leading-none">

                              {formData.desiredPosition}

                          </h2>

                          <p className="mt-4 text-cyan-100 max-w-2xl">

                              {formData.about}

                          </p>

                      </div>

                  </div>

              </div>



              <div className="p-12 space-y-10">

                  {/* EXPERIÊNCIA */}

                  <div className="bg-white rounded-3xl p-8 shadow-sm border">

                      <h2 className="text-2xl font-bold mb-8">

                          Experiência Profissional

                      </h2>

                      <div className="flex gap-6">

                          <div className="flex flex-col items-center">

                              <div className="w-4 h-4 rounded-full bg-sky-500"/>

                              <div className="flex-1 w-[2px] bg-slate-200"/>

                          </div>

                          <div className="leading-8 whitespace-pre-line">

                              {formData.experience}

                          </div>

                      </div>

                  </div>



                  {/* GRID */}

                  <div className="grid lg:grid-cols-2 gap-8">

                      <div className="rounded-3xl border bg-white p-8">

                          <h2 className="text-xl font-bold mb-6">

                              Formação

                          </h2>

                          <p className="leading-8 whitespace-pre-line">

                              {formData.education}

                          </p>

                      </div>

                      <div className="rounded-3xl border bg-white p-8">

                          <h2 className="text-xl font-bold mb-6">

                              Objetivo

                          </h2>

                          <p>

                              <strong>Cargo:</strong> {formData.desiredPosition}

                          </p>

                          <p className="mt-3">

                              <strong>Pretensão:</strong> {formData.salaryExpectation}

                          </p>

                      </div>

                      <div className="rounded-3xl border bg-white p-8">

                          <h2 className="text-xl font-bold mb-6">

                              Certificações

                          </h2>

                          <ul className="space-y-3">

                              {formData.certifications.map((item:string)=>(

                                  <li
                                      key={item}
                                      className="rounded-xl bg-slate-100 p-3"
                                  >
                                      {item}
                                  </li>

                              ))}

                          </ul>

                      </div>

                      <div className="rounded-3xl border bg-white p-8">

                          <h2 className="text-xl font-bold mb-6">

                              Cursos

                          </h2>

                          <ul className="space-y-3">

                              {formData.courses.map((item:string)=>(

                                  <li
                                      key={item}
                                      className="rounded-xl bg-slate-100 p-3"
                                  >
                                      {item}
                                  </li>

                              ))}

                          </ul>

                      </div>

                  </div>



                  {/* CONQUISTAS */}

                  <div className="rounded-3xl border bg-white p-8">

                      <h2 className="text-2xl font-bold mb-6">

                          Conquistas

                      </h2>

                      <div className="grid md:grid-cols-2 gap-4">

                          {formData.achievements.map((item:string)=>(

                              <div
                                  key={item}
                                  className="
                                  rounded-2xl
                                  border
                                  border-sky-200
                                  bg-gradient-to-r
                                  from-sky-50
                                  to-cyan-50
                                  p-5
                                  "
                              >
                                  ⭐ {item}
                              </div>

                          ))}

                      </div>

                  </div>

              </div>

          </section>

      </div>

      </div>
      )}

      {showSendModal && (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

      <div className="flex justify-between items-center border-b px-6 py-5">

      <h2 className="text-2xl font-bold">

      Compartilhar currículo

      </h2>

      <button

      onClick={()=>setShowSendModal(false)}

      className="hover:bg-gray-100 rounded-full p-2"

      >

      <X/>

      </button>

      </div>

      <div className="p-6 space-y-4">

      <button

      disabled={loadingPdf}

      onClick={handleDownload}

      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl p-4 flex items-center justify-center gap-3 transition"

      >

      <Download/>

      {loadingPdf ? "Gerando PDF..." : "Baixar PDF"}

      </button>

      </div>

      </div>

      </div>

      )}
    </main>
  );
}
