import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Search, User, Users } from "lucide-react";
import { columns } from "./components/columns";
import { usersService } from "@/services/users.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { useMemo, useState } from "react";
import { UserModel } from "@/interfaces/models/User";
import { fishFeedService } from "@/services/fish-feed.service";
import { PopulateButton } from "@/components/buttons/populate-button";
import { populateUsers } from "@/mocks/handlers/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filter } from "@/utils/filter";
import { InviteDialog } from "./components/invite-dialog";

export function UsersScreen() {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");

  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryFn: () => usersService.getAll(),
    queryKey: ["users"],
  });

  const filtered = useMemo(() => {
    return filter(data, search, ["email", "userName"]);
  }, [search, data]);

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <PageHeader
            icon={Users}
            title="Usuários"
            path={["Sistema", "Administração"]}
          />
          <div className="space-x-2 flex">
            <Input
              className="bg-white"
              leftIcon={Search}
              placeholder="Pesquisar usuários..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline" onClick={() => setIsInviteOpen(true)}>
              <User /> Convidar
            </Button>
            <PopulateButton
              onClick={() => {
                populateUsers();
                qc.invalidateQueries({ queryKey: ["users"] });
              }}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          isLoading={isLoading}
          error={error?.message}
        />
      </div>
      <InviteDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} />
    </>
  );
}
