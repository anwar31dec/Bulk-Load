import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import _ from "lodash";
import React from "react";
import { CompositionRoot } from "../CompositionRoot";
import { AppContext } from "../webapp/contexts/api-context";
import Settings from "../webapp/logic/settings";
import ThemesPage from "../webapp/pages/themes/ThemesPage";
import { initializeMockServer } from "./mocks/server";

let settings: Settings;
const { api } = initializeMockServer();

const renderComponent = async () => {
    await act(async () => {
        render(
            <AppContext.Provider value={{ api, d2: {} }}>
                <ThemesPage
                    settings={settings}
                    themes={[]}
                    setSettings={_.noop}
                    setThemes={_.noop}
                />
            </AppContext.Provider>
        );
    });
};

describe("ImportTemplatePage", () => {
    beforeAll(async () => {
        CompositionRoot.initialize({
            appConfig: {
                appKey: "bulk-load",
                storage: "dataStore",
            },
            dhisInstance: { url: api.baseUrl },
            mockApi: api,
        });

        settings = await Settings.build(api);
    });

    test("Renders correctly", async () => {
        await renderComponent();

        expect(screen.getByRole("button", { name: "Create theme" })).toBeInTheDocument();
    });
});

export {};
