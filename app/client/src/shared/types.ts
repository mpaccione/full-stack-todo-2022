export interface ToDo {
    completed: boolean;
    description: string;
    id: string;
}

export interface List {
    createdAt: number;
    id: string;
    items: Array<ToDo>;
    updatedAt: number;
}
