export interface HeroBanner {
  id?: string;
  title: string;
  remarks: string;
  image: string | File | null;
  status: "Active" | "Inactive";
}

export interface HeroBannerFormProps {
  initialData?: Partial<HeroBanner>;
  onSubmit: (data: HeroBanner) => Promise<void>;
  isLoading?: boolean;
}
