
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UsersTable from "./UsersTable";

interface UsersTabProps {
  isLoading: boolean;
  users: any[] | null;
  handleRoleChange: (userId: string, newRole: 'customer' | 'barber' | 'admin') => void;
}

const UsersTab = ({ isLoading, users, handleRoleChange }: UsersTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Management</CardTitle>
        <CardDescription>Manage user roles and accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable 
          isLoading={isLoading} 
          users={users} 
          handleRoleChange={handleRoleChange} 
        />
      </CardContent>
    </Card>
  );
};

export default UsersTab;
