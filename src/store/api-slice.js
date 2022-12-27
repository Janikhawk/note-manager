import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const directoryApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4200' }),
    tagTypes: ['Directories'],
    endpoints: (builder) => ({
        getDirectories: builder.query({
            query: () => `directories`,
            providedTags: ['Directories'],
            transformResponse: (responseData) => {
                return normalizeList(responseData);
            }
        }),
        createDirectory: builder.mutation({
            query: (directory) => ({
                url: 'directories',
                method: 'POST',
                body: {...directory}
            }),
            invalidatesTags: ['Directories']
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDirectoriesQuery } = directoryApi;

function normalizeList(list) {
    const idMapping = list.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});
    let root;
    list.forEach((el) => {
        el.isOpen = false;
        if (!el.parentId) {
            root = el;
            return;
        }
        const parentEl = list[idMapping[el.parentId]];
        parentEl.children ? parentEl.children.push(el) : parentEl.children = [el];
    });

    return root.children;
}