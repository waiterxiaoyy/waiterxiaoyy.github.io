
export namespace Blog {
    export interface Metadata {
        id: number;
        title: string;
        avatar: string;
        author: string;
        date: string;
        category: string;
        tags: string[];
        abstract: string;
        fileName: string;
        filePath?: string;
        mdContent?: string;
    }

    export interface TagInfo { [key: string]: { color: string, count: number, badgeColor: string} }

    export interface CategoryInfo { [key: string]: { count: number }}
}

export interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
}

// export type  MenuItem = Required<MenuProps>['items'][number]

export interface ITbas {
    categoryInfo: Blog.CategoryInfo;
    timeMenu: MenuItem[];
    seletedTimeMenu: string[];
    seletedCategory: string;
    handleTimeMenuChange: (timeMenu: string[]) => void;
    handleCategoryChange: (category: string) => void;
    searchChange: (event: any) => void;
    handleAllBlogs: () => void;
}
