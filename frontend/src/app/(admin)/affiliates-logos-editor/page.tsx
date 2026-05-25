"use client";
import { getAllAffiliates, updateAffiliates } from "@/api/affiliates";
import { LogoEditorPage } from "@/components/admin-portal/LogoEditorPage";

export default function AffiliateLogosEditorPage() {
  return (
    <LogoEditorPage
      title="Affiliate Logos"
      tags={["ABOUT US"]}
      description="Replace affiliate logos, reorder by dragging, or add/remove logos."
      addLabel="Affiliate"
      storageFolder="affiliates"
      fetchItems={getAllAffiliates}
      publishItems={async (items) => updateAffiliates(items).then(() => {})}
      page="About Us"
    />
  );
}
