import { Suspense } from "react";
import { RegistroModalContent } from "./RegistroModalContent";

export default function RegistroModal() {
  return (
    <Suspense fallback={null}>
      <RegistroModalContent />
    </Suspense>
  );
}