import React, { createContext, useReducer } from "react";
import { useTheme } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { UserContextProvider } from "../lib/UserContext";
import { supabase } from "../utils/initSupabase";

export const ModalContext = createContext(null);

const modalState = {
  isModalOpen: false,
  reportNameToDelete: null,
  selectedReportId: null,
};

function modalReducer(state, action) {
  switch (action.type) {
    case "toggle-modal":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "select-report-to-delete":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        reportNameToDelete: action.payload.firstName,
        selectedReportId: action.payload.id,
      };
    case "select-report-to-update":
      return {
        ...state,
        selectedReportId: action.payload.id,
      };
    default:
      throw new Error();
  }
}

function MyApp({ Component, pageProps }) {
  const [modal, dispatch] = useReducer(modalReducer, modalState);

  return (
    <UserContextProvider supabaseClient={supabase}>
      <ModalContext.Provider value={{ modal, dispatch }}>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ModalContext.Provider>
    </UserContextProvider>
  );
}

export default MyApp;
