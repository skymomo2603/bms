export type HeroBannerStatus = "Active" | "Inactive";

export interface HeroBannerDto {
  id: number;
  title: string;
  remarks: string;
  image: string;
  status: HeroBannerStatus;
}

export interface HeroBannerFormData {
  title: string;
  remarks: string;
  image: string | null;
  status: HeroBannerStatus;
}

export interface HeroBannerFormProps {
  initialData?: Partial<HeroBannerFormData>;
  onSubmit: (data: HeroBannerFormData) => Promise<void>;
  onNew: () => void;
  isLoading?: boolean;
}
