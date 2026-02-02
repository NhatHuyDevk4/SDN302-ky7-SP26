


export const parsePagination = (query) => {
    // Khai báo page 
    const page = Math.max(parseInt(query.page || '1', 10), 1);
    // khai báo limit
    const limit = Math.min(Math.max(parseInt(query.limit || '10', 10), 1), 100);
    // skip 
    const skip = (page - 1) * limit;
    // page = 1 => skip = 0
    // page = 2 => skip = 10
    // page = 3 => skip = 20
    return { page, limit, skip };
}