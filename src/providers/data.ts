import {BaseRecord, DataProvider, GetListParams, GetListResponse} from "@refinedev/core";
import {MOCK_SUBJECTS} from "@/constants/mock-data.ts";

export const dataProvider: DataProvider = {
    // getList: async <TData extends BaseRecord = BaseRecord>({resource}: GetListParams): Promise<GetListResponse<TData>> => {
    //     if (resource !== 'subjects')
    //         return {data: [] as TData[], total: 0};
    //
    //     return {
    //         data: MOCK_SUBJECTS as unknown as TData[],
    //         total: MOCK_SUBJECTS.length,
    //     }
    //
    // },
    getList: async <TData extends BaseRecord = BaseRecord>({resource, filters,  pagination}: GetListParams): Promise<GetListResponse<TData>> => {
        if (resource !== 'subjects')
            return {data: [] as TData[], total: 0};
        let result = [...MOCK_SUBJECTS];
        // Apply filters
        if (filters) {
            for (const filter of filters) {
                if ("field" in filter) {
                    if (filter.operator === "eq") {
                        result = result.filter((item) => item[filter.field as keyof typeof item] === filter.value);
                    } else if (filter.operator === "contains") {
                        result = result.filter((item) =>
                            String(item[filter.field as keyof typeof item]).toLowerCase().includes(String(filter.value).toLowerCase())
                        );
                    }
                }
            }
        }
        const total = result.length;
        // Apply pagination
        if (pagination?.mode === "server") {
            const current = pagination.currentPage ?? 1;
            const pageSize = pagination.pageSize ?? 10;
            result = result.slice((current - 1) * pageSize, current * pageSize);
        }
        return {
            data: result as unknown as TData[],
            total,
        };
    },

    getOne: async () => {
        throw new Error('This function is not present in mock')
    },
    create: async () => {
        throw new Error('This function is not present in mock')
    },
    update: async () => {
        throw new Error('This function is not present in mock')
    },
    deleteOne: async () => {
        throw new Error('This function is not present in mock')
    },

    getApiUrl: () => ''
}