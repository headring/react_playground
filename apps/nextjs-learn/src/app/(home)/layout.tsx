import Link from "next/link";
import ErrorButton from "../ui/dashboard/errorbutton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-300">
      folderGroup Layout
      <ErrorButton title="layout" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link href="/checker">to checker</Link>
        <Link href="dashboard">to dash</Link>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
