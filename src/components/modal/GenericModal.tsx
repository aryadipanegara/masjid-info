import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormData } from "@/types/form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Masjid {
  id: string;
  name: string;
}

interface DetailMasjid {
  id: string;
  name: string;
}

interface Categories {
  id: string;
  name: string;
}

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  fields: FormField[];
  data: FormData;
  onChange: (name: string, value: string | number) => void;
  masjidList: Masjid[];
  detailMasjidList?: DetailMasjid[];
  categoriesList?: Categories[];
}

export default function GenericModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  data,
  onChange,
  masjidList,
  detailMasjidList = [],
  categoriesList = [],
}: GenericModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid gap-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </label>
              {field.type === "select" ? (
                <Select
                  value={data[field.name] as string}
                  onValueChange={(value) => onChange(field.name, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent className="p-6">
                    {field.name === "detailMasjidId" ? (
                      detailMasjidList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    ) : field.name === "id_masjid" ? (
                      masjidList.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    ) : field.name === "id_category" ? (
                      categoriesList.length > 0 ? (
                        categoriesList.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No Categories Available
                        </SelectItem>
                      )
                    ) : null}
                  </SelectContent>
                </Select>
              ) : field.type === "rich-text" ? (
                <div className="h-64">
                  <ReactQuill
                    theme="snow"
                    value={data[field.name] as string}
                    onChange={(content) => onChange(field.name, content)}
                    className="h-full"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                  />
                </div>
              ) : field.type === "text" ||
                field.type === "number" ||
                field.type === "email" ||
                field.type === "password" ||
                field.type === "checkbox" ||
                field.type === "radio" ||
                field.type === "options" ? (
                <Input
                  id={field.name}
                  value={data[field.name] as string}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="w-full"
                />
              ) : null}
            </div>
          ))}
        </div>
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
