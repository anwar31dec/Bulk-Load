import "@testing-library/jest-dom/extend-expect";
import { act, render, screen, wait, fireEvent } from "@testing-library/react";
import { LoadingProvider, SnackbarProvider } from "d2-ui-components";
import _ from "lodash";
import React from "react";
import { CompositionRoot } from "../CompositionRoot";
import { AppContext } from "../webapp/contexts/api-context";
import Settings from "../webapp/logic/settings";
import DownloadTemplatePage from "../webapp/pages/download-template/DownloadTemplatePage";
import { initializeMockServer } from "./mocks/server";

let settings: Settings;
const { api } = initializeMockServer();

const renderComponent = async () => {
    await act(async () => {
        render(
            <AppContext.Provider value={{ api, d2: {} }}>
                <LoadingProvider>
                    <SnackbarProvider>
                        <DownloadTemplatePage
                            settings={settings}
                            themes={[]}
                            setSettings={_.noop}
                            setThemes={_.noop}
                        />
                    </SnackbarProvider>
                </LoadingProvider>
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

        expect(screen.getByRole("heading", { name: "Template properties" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Advanced properties" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Download template" })).toBeInTheDocument();
    });
});

export {};
