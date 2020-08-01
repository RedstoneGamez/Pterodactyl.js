interface PaginationOptions {
    total: number;
    count: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    links: any[];
}

interface PaginationOptionsRaw {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: any[];
}

export { PaginationOptions, PaginationOptionsRaw };

class Pagination implements PaginationOptions {
    public total: number;
    public count: number;
    public pageSize: number;
    public currentPage: number;
    public totalPages: number;
    public links: any[];

    constructor(data: PaginationOptionsRaw) {
        this.total = data.total;
        this.count = data.count;
        this.pageSize = data.per_page;
        this.currentPage = data.current_page;
        this.totalPages = data.total_pages;
        this.links = data.links;
    }

    public nextPage(): number {
        return this.currentPage + 1;
    }
}

export default Pagination;