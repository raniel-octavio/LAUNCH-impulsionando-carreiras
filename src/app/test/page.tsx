"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  const [result, setResult] = useState<string>("Carregando...");

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        setResult(`Erro: ${error.message}`);
        console.error("Erro completo:", error);
      } else {
        setResult(`Conectado! Registros encontrados: ${data.length}`);
        console.log("Dados:", data);
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Teste de conexão Supabase</h1>
      <p>{result}</p>
    </div>
  );
}