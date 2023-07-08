import React from "react";
import Head from "next/head";
import { ipcRenderer } from "electron";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>sc2-build-order-overlay</title>
      </Head>
      <div className="flex flex-col p-3 gap-3">
        <p>Page d'overlay</p>
        <button
          className="p-3 bg-zinc-300 rounded-lg"
          onClick={() => {
            ipcRenderer.invoke("create-settings-page");
          }}
        >
          Open Settings
        </button>
      </div>
    </React.Fragment>
  );
}

export default Home;
