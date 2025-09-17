module.exports = {
    api: {
        input: "http://localhost:8000/openapi.json", // OpenAPI schema FastAPI
        output: {
            mode: "tags-split",
            target: "./src/api/generated.ts",
            client: "react-query",
            override: {
                mutator: {
                    path: "./src/lib/axios.ts",
                    name: "apiClient",
                },
            },
        },
    },
};
