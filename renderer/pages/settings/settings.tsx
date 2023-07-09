import React from "react";
import Layout from "./components/Layout";
import ActionAreaCard from "./components/ActionAreaCard";
import { useRouter } from "next/router";

function Settings() {
  const router = useRouter();

  return (
    <Layout>
      <div className="m-3 flex flex-wrap justify-center gap-5">
        <ActionAreaCard
          title={"Show your build"}
          link={
            "https://c4.wallpaperflare.com/wallpaper/310/317/123/starcraft-ii-4k-hd-latest-wallpaper-preview.jpg"
          }
          toDo={() => {
            router.push({
              pathname: "/settings/Show",
              query: {},
            });
          }}
        />
        <ActionAreaCard
          title={"Create your build"}
          link={"https://wallpapers.com/images/featured/tbrha3aoagau52xz.jpg"}
          toDo={() => {
            router.push({
              pathname: "/settings/Create",
              query: {},
            });
          }}
        />

        <ActionAreaCard
          title={"Import your build"}
          link={
            "https://www.s-ge.com/sites/default/files/styles/sge_header_lg/public/publication/images/e-commerce.jpg?itok=2T87UuIH"
          }
          toDo={{}}
        />
      </div>
    </Layout>
  );
}

export default Settings;
