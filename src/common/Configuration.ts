import { GridDensity } from "@mui/x-data-grid";

export const pageSizes: number[] = [5, 10, 20, 30, 40, 50, 100];
export const defaultPageSize: number = 50;
export const density: GridDensity = "compact";
export type SortDirectionType = "asc" | "desc" | null | undefined;
export type ContextMenuType = {
  mouseX: number;
  mouseY: number;
};

export const regExEMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const arrUserStatus: string[] = [' ', 'Registered', 'Active', 'Inactive', 'Locked', 'Suspended'];