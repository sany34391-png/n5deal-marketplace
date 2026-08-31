import DashboardGuard from "./DashboardGuard";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <DashboardGuard>
      <DashboardContent />
    </DashboardGuard>
  );
}