import type { AdminFilterValues } from "@/types/admin";

export type CarouselStatus = "Active" | "Inactive";

export interface CarouselDto {
  id: number;
  headline: string;
  message: string;
  title: string;
  remarks: string;
  status: CarouselStatus;
}

export interface CarouselFormData {
  headline: string;
  message: string;
  title: string;
  remarks: string;
  status: CarouselStatus;
}

export interface CarouselFormProps {
  initialData?: Partial<CarouselFormData>;
  onSubmit: (data: CarouselFormData) => Promise<void>;
  onNew: () => void;
  isLoading?: boolean;
}

export type CarouselListFilterValues = AdminFilterValues;

export interface CarouselPendingStatusChange {
  id: number;
  title: string;
  currentStatus: CarouselStatus;
  nextStatus: CarouselStatus;
}

export interface CarouselPendingDeleteAction {
  ids: number[];
  mode: "single" | "bulk";
  title?: string;
}
