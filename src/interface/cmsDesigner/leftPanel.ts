export interface IMenus {
    key: string;
    title: string;
    icon?: string;
    children?: IMenus[];
    selected?: boolean;
}
