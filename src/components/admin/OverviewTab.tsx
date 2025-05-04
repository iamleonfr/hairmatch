
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewCards from "./OverviewCards";

interface OverviewTabProps {
  isLoading: boolean;
  users: any[] | null;
}

const OverviewTab = ({ isLoading, users }: OverviewTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Admin Dashboard</CardTitle>
        <CardDescription>Manage your application and users</CardDescription>
      </CardHeader>
      <CardContent>
        <OverviewCards isLoading={isLoading} users={users} />
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
