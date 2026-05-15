import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function InfoBox() {
  const { user } = useAuthStore();
  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://demo.splynx.com/images/avatars/0.png",
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  function handleImageClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <Box title="Informações" className="w-full">
      <div className="pt-6 space-y-6 flex items-center justify-center">
        <div className="grid grid-cols-[120px_1fr] gap-y-5 gap-x-6 items-center">
          <Label className="text-right">E-mail</Label>

          <strong className="text-sm font-medium">{user?.email}</strong>

          <Label className="text-right self-start pt-2">Foto</Label>

          <div className="flex items-center gap-4 flex-wrap">
            <Image
              width={100}
              height={100}
              alt="Profile Image"
              src={
                imagePreview || "https://demo.splynx.com/images/avatars/0.png"
              }
              className="rounded-full size-[100px] object-cover border"
            />

            <Button className="gap-2" onClick={handleImageClick}>
              <span className="hidden sm:block">Trocar imagem</span>

              <Upload size={16} />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
