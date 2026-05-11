import { uuid } from "uuidv4";
import { EmailCard } from "./email-card";
import { PhoneCard } from "./phone-card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { EmailForm } from "@/components/pessoa/email-form";
// import { TelefoneForm } from "@/components/pessoa/telefone-form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Box } from "../ui/box";
import { Plus } from "lucide-react";
import { PersonEmailSchema } from "@/schemas/person-email-schema";
import { PersonPhoneSchema } from "@/schemas/person-phone-schema";
import { useQuery } from "@tanstack/react-query";
import { PersonEntityType } from "@/interfaces/enums/PersonEntityType";
import { toast } from "@/hooks/useToast";
import { personService } from "@/services/person.service";
import { PhoneForm } from "./phone-form";
import { EmailForm } from "./email-form";
import { Button } from "../ui/button";

type WindowType = "endereco" | "telefone" | "email";

type ContactDetailsProps = {
  id: number;
};

export function ContactDetails({ id }: ContactDetailsProps) {
  const [selectWindow, setSelectedWindow] = useState<WindowType>("telefone");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    createEmail,
    createPhone,
    deleteEmail,
    deletePhone,
    getEmails,
    getPhones,
    updateEmail,
    updatePhone,
  } = personService;

  const boxTitle = () => {
    switch (selectWindow) {
      case "email":
        return "E-mail";
      case "endereco":
        return "Endereço";
      case "telefone":
        return "Telefone";
      default:
        return "";
    }
  };

  const {
    data: emails,
    isLoading: isLoadingEmails,
    error: errorEmails,
    refetch: refetchEmails,
  } = useQuery({
    queryFn: () => getEmails(id),
    queryKey: ["emails", id],
  });

  const {
    data: telefones,
    isLoading: isLoadingTelefones,
    error: errorTelefones,
    refetch: refetchTelefones,
  } = useQuery({
    queryFn: () => getPhones(id),
    queryKey: ["telefones", id],
  });

  // async function createEnderecoFn(data: EnderecoSchema) {
  //   try {
  //     // await addEnderecoToPessoa(id, data);

  //     toast({
  //       title: "Endereço adicionado com sucesso!",
  //       description: "O endereço foi adicionado com sucesso.",
  //     });

  //     setIsCreateDialogOpen(false);
  //     await refetchEnderecos();
  //   } catch (err: any) {
  //     toast({
  //       title: "Erro ao adicionar endereço",
  //       description: err.message,
  //       variant: "destructive",
  //     });
  //   }
  // }

  async function createTelefoneFn(data: PersonPhoneSchema) {
    try {
      await createPhone(id, {
        ddd: data.ddd,
        ehWhatsApp: data.ehWhatsApp,
        numero: data.numero,
        principal: data.principal,
        tipoTelefoneId: data.tipoTelefoneId,
      });

      toast({
        title: "Telefone adicionado com sucesso!",
        description: "O telefone foi adicionado com sucesso.",
      });

      setIsCreateDialogOpen(false);
      await refetchTelefones();
    } catch (err: any) {
      toast({
        title: "Erro ao adicionar telefone",
        description: err.message,
        variant: "destructive",
      });
    }
  }

  async function createEmailFn(data: PersonEmailSchema) {
    try {
      await createEmail(id, {
        principal: data.principal,
        email: data.email,
      });
      toast({
        title: "E-mail adicionado com sucesso!",
        description: "O e-mail foi adicionado com sucesso.",
      });

      setIsCreateDialogOpen(false);
      await refetchEmails();
    } catch (err: any) {
      toast({
        title: "Erro ao adicionar e-mail",
        description: err.message,
        variant: "destructive",
      });
    }
  }

  // async function editEnderecoFn(itemId: number, data: EnderecoSchema) {
  //   // await editEnderecoInPessoa(id, itemId, data);

  //   await refetchEnderecos();
  // }

  async function editTelefoneFn(itemId: number, data: PersonPhoneSchema) {
    await updatePhone(id, itemId, {
      ddd: data.ddd,
      ehWhatsApp: data.ehWhatsApp,
      numero: data.numero,
      principal: data.principal,
      tipoTelefoneId: data.tipoTelefoneId,
    });

    await refetchTelefones();
  }

  async function editEmailFn(itemId: number, data: PersonEmailSchema) {
    await updateEmail(id, itemId, {
      principal: data.principal,
      email: data.email,
    });

    await refetchEmails();
  }

  // async function deleteEnderecoFn(itemId: number) {
  //   await deleteEnderecoInPessoa(id, itemId);

  //   await refetchEnderecos();
  // }

  async function deleteTelefoneFn(itemId: number) {
    await deletePhone(id, itemId);

    await refetchTelefones();
  }

  async function deleteEmailFn(itemId: number) {
    await deleteEmail(id, itemId);

    await refetchEmails();
  }

  return (
    <>
      <div className="flex flex-col w-1/2">
        <div className="space-x-4 ml-2">
          {/* <button
            className={cn(
              "p-2 hover:bg-gray-200 transition-all rounded-t-md text-sm",
              selectWindow === "endereco" && "bg-gray-200"
            )}
            onClick={() => setSelectedWindow("endereco")}
          >
            Endereço
          </button> */}
          <button
            className={cn(
              "p-2 hover:bg-gray-200 transition-all rounded-t-md text-sm",
              selectWindow === "telefone" && "bg-gray-200",
            )}
            onClick={() => setSelectedWindow("telefone")}
          >
            Telefone
          </button>
          <button
            className={cn(
              "p-2 hover:bg-gray-200 transition-all rounded-t-md text-sm",
              selectWindow === "email" && "bg-gray-200",
            )}
            onClick={() => setSelectedWindow("email")}
          >
            E-mail
          </button>
        </div>
        <Box
          title={boxTitle()}
          headerInfo={
            <Button
              className="size-8"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus />
            </Button>
          }
        >
          {/* {selectWindow === "endereco" &&
            enderecos?.map((endereco) => (
              <EnderecoCard
                endereco={endereco}
                deleteFn={deleteEnderecoFn}
                editFn={editEnderecoFn}
                key={uuid()}
              />
            ))} */}
          {selectWindow === "email" &&
            emails?.map((email) => (
              <EmailCard
                email={email}
                deleteFn={deleteEmailFn}
                editFn={editEmailFn}
                key={uuid()}
              />
            ))}
          {selectWindow === "telefone" &&
            telefones?.map((telefone) => (
              <PhoneCard
                telefone={telefone}
                deleteFn={deleteTelefoneFn}
                editFn={editTelefoneFn}
                key={uuid()}
              />
            ))}
        </Box>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogTitle>Adicionar {boxTitle().toLowerCase()}</DialogTitle>
          {/* {selectWindow === "endereco" && (
            <EnderecoForm onSubmit={createEnderecoFn} />
          )} */}
          {selectWindow === "email" && <EmailForm onSubmit={createEmailFn} />}
          {selectWindow === "telefone" && (
            <PhoneForm onSubmit={createTelefoneFn} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
