"use client";
import { getAllColleges, updateColleges } from "@/api/colleges";
import { LogoEditorPage } from "@/components/admin-portal/LogoEditorPage";

export default function CollegeLogosEditorPage() {
  return (
    <LogoEditorPage
      title="College Logos"
      tags={["MEET THE TEAM"]}
      description="Replace college logos, reorder by dragging, or add/remove logos."
      addLabel="College"
      storageFolder="colleges"
      fetchItems={getAllColleges}
      publishItems={async (items) => updateColleges(items).then(() => {})}
      page="Meet the Team"
    />
  );
}
