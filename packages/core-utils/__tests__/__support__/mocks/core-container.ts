jest.mock("@phantomchain/core-container", () => {
    return {
        app: {
            getConfig: () => {
                return {
                    getMilestone: () => ({
                        epoch: "2019-01-03T12:00:00.000Z",
                        activeDelegates: 51,
                    }),
                };
            },
        },
    };
});
