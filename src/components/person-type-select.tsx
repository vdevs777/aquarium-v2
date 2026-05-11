import { PersonType } from "@/interfaces/enums/PersonType";
import { Checkbox } from "./ui/checkbox";
import { toast } from "@/hooks/useToast";

type PersonTypeSelectProps = {
  value: {
    [PersonType.Physical]: boolean;
    [PersonType.Legal]: boolean;
  };

  onCheck: {
    [PersonType.Physical]: (checked: boolean) => void;
    [PersonType.Legal]: (checked: boolean) => void;
  };

  disabled?: boolean;
};

export function PersonTypeSelect({
  value,
  onCheck,
  disabled,
}: PersonTypeSelectProps) {
  function validateUncheck(type: PersonType, checked: boolean) {
    if (checked) {
      onCheck[type](true);
      return;
    }

    const otherType =
      type === PersonType.Physical ? PersonType.Legal : PersonType.Physical;

    const otherChecked = value[otherType];

    if (!otherChecked) {
      toast({
        title: "Selecione ao menos um tipo de pessoa",
        variant: "destructive",
      });
      return;
    }

    onCheck[type](false);
  }

  return (
    <div className="flex items-center gap-6">
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox
          checked={value[PersonType.Physical]}
          disabled={disabled}
          onCheckedChange={(checked) =>
            validateUncheck(PersonType.Physical, !!checked)
          }
        />

        <span className="text-sm">Pessoa física</span>
      </label>

      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox
          checked={value[PersonType.Legal]}
          disabled={disabled}
          onCheckedChange={(checked) =>
            validateUncheck(PersonType.Legal, !!checked)
          }
        />

        <span className="text-sm">Pessoa jurídica</span>
      </label>
    </div>
  );
}
