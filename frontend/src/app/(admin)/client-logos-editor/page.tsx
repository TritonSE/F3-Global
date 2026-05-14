"use client";
import { getAllClients, updateClients } from "@/api/client";
import { LogoEditorPage } from "@/components/admin-portal/LogoEditorPage";

export default function ClientLogosEditorPage() {
  return (
    <LogoEditorPage
      title="Client Logos"
      tags={["ABOUT US"]}
      description="Replace client logos, reorder by dragging, or add/remove logos."
      addLabel="Client"
      storageFolder="clients"
      fetchItems={getAllClients}
      publishItems={async (items) => updateClients(items).then(() => {})}
    />
  );
}
